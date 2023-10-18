import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {selectUser, login, logout} from "./features/userSlice";
import {auth} from './firebase'
import './App.module.css';
import Feed from "./components/Feed";
import Auth from "./components/Auth";
import styles from "./App.module.css";

const App: React.FC = ()=> {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // login, logoutなどのユーザーに関する変化の監視を開始
    const unSub = auth.onAuthStateChanged((authUser)=> {
      // 返り値がある（ログイン）場合はauthUserで受け取りRedux処理
      if (authUser) {
        dispatch(
            login({
              uid: authUser.uid,
              photoUrl: authUser.photoURL,
              displayName: authUser.displayName
          })
        )
      } else {
        dispatch(logout())
      }
      setIsAuthCheck(true)
    })

    // アンマウント（このコンポーネントを非表示）した際、下記を記述しcleanUpすることで、呼び出されることがなくなる
    return ()=> {
      unSub();
    }
  }, [dispatch]);

  const [isAuthCheck, setIsAuthCheck] = useState(false)
  return (
    <>
      {/*{user.uid ? (*/}
      {/*    <div className={styles.app}>*/}
      {/*      <Feed/>*/}
      {/*    </div>*/}
      {/*):(*/}
      {/*    <Auth/>*/}
      {/*)}*/}
      {/* リロード時に一瞬ログイン画面が表示されr現象を回避 */}
      {user.uid && (
          <div className={styles.app}>
            <Feed/>
          </div>
      )}
      {!user.uid && isAuthCheck && (
        <Auth/>
      )}
    </>
  );
}

export default App;
