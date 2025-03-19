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
    <>
      <div className="flex flex-row border-t-2 border-gray-50 border-opacity-5 py-6 text-base justify-between">
        <IonIcon className="w-full h-7" icon={homeOutline} />
        <IonIcon className="w-full h-7" icon={searchOutline} />
        <IonIcon className="w-full h-7" icon={gridOutline} />
        <IonIcon className="w-full h-7" icon={wallet} />
        <div className="w-full flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Notification Icon */}
            <IonIcon className="w-7 h-7" icon={notificationsOutline} />

            {/* Red Circle (Badge) */}
            <span className="w-5 h-5 bg-red-600 flex items-center justify-center text-center text-xs rounded-full absolute top-0.5 right-0.5 transform translate-x-1/2 -translate-y-1/2">
              {state.notiCount}
            </span>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Notification Icon */}
            <IonIcon className="w-7 h-7" icon={chatbubblesOutline} />

            {/* Red Circle (Badge) */}
            <span className="w-5 h-5 flex items-center justify-center text-center text-xs rounded-full bg-red-600 absolute top-0.5 right-0.5 transform translate-x-1/2 -translate-y-1/2">
              {state.dcCount}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
