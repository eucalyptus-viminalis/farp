import { IonIcon } from "@ionic/react";
import {
  wallet,
  homeOutline,
  searchOutline,
  gridOutline,
  notificationsOutline,
  chatbubblesOutline,
} from "ionicons/icons";
import { useFarplet } from "../_hooks/useFarplet";

export default function BottomBar() {
  const { state } = useFarplet();
  return (
    <div className="fixed flex items-center justify-center left-0 w-screen bottom-0">
      <div
        className="
        w-full sm:w-[540px] lg:w-[620px]
        flex flex-row justify-between
        bg-app
        border-t sm:border-x border-default
        py-4
        "
      >
        <IonIcon className="w-full h-7" icon={homeOutline} />
        <IonIcon className="w-full h-7" icon={searchOutline} />
        <IonIcon className="w-full h-7" icon={gridOutline} />
        <IonIcon className="w-full h-7" icon={wallet} />
        <div className="w-full flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <IonIcon className="w-7 h-7" icon={notificationsOutline} />
            <span className="w-5 h-5 text-white bg-red-600 flex items-center justify-center text-center text-xs rounded-full absolute top-0.5 right-0.5 transform translate-x-1/2 -translate-y-1/2">
              {state.notiCount}
            </span>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <IonIcon className="w-7 h-7" icon={chatbubblesOutline} />
            <span className="w-5 h-5 flex text-white items-center justify-center text-center text-xs rounded-full bg-red-600 absolute top-0.5 right-0.5 transform translate-x-1/2 -translate-y-1/2">
              {state.dcCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
