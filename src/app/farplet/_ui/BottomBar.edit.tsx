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
      <div className="flex flex-row border-t-2 border-gray-50 border-opacity-5 py-6 text-4xl justify-between">
        <IonIcon className="w-full" icon={homeOutline} />
        <IonIcon className="w-full" icon={searchOutline} />
        <IonIcon className="w-full" icon={gridOutline} />
        <IonIcon className="w-full" icon={wallet} />
        <div className="w-full flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Notification Icon */}
            <IonIcon className="" icon={notificationsOutline} />

            {/* Red Circle (Badge) */}
            <span className="w-6 bg-red-600 h-6 flex items-center justify-center text-center text-sm rounded-full absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2">
              <NotiCount />
            </span>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Notification Icon */}
            <IonIcon className="" icon={chatbubblesOutline} />

            {/* Red Circle (Badge) */}
            <span className="w-6 h-6 flex items-center justify-center text-center text-sm rounded-full bg-red-600 absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2">
              <DCCount />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
