import { IonIcon } from "@ionic/react";
import {
  wallet,
  homeOutline,
  searchOutline,
  gridOutline,
  notificationsOutline,
  chatbubblesOutline,
} from "ionicons/icons";
import NotiCount from "./NotiCount.edit";
import DCCount from "./DCCount.edit";

export default function BottomBar() {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-app border-t border-purple-50 border-opacity-10 py-5 flex flex-row justify-between">
        {/* <div className="fixed bottom-0 left-0 w-full bg-app flex flex-row border-t-2 border-gray-50 border-opacity-5 py-6 justify-between"> */}
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
              <NotiCount />
            </span>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Notification Icon */}
            <IonIcon className="w-7 h-7" icon={chatbubblesOutline} />

            {/* Red Circle (Badge) */}
            <span className="w-5 h-5 flex items-center justify-center text-center text-xs rounded-full bg-red-600 absolute top-0.5 right-0.5 transform translate-x-1/2 -translate-y-1/2">
              <DCCount />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
