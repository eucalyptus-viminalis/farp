import { IonIcon } from "@ionic/react";
import {
  wallet,
  homeOutline,
  searchOutline,
  gridOutline,
} from "ionicons/icons";
import DCTabIcon from "./DCTabIcon.edit";
import NotiTabIcon from "./NotiTabIcon.edit";

export default function BottomBar() {
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
        {/* <div className="fixed bottom-0 left-0 w-full bg-app flex flex-row border-t-2 border-gray-50 border-opacity-5 py-6 justify-between"> */}
        <IonIcon className="w-full h-7" icon={homeOutline} />
        <IonIcon className="w-full h-7" icon={searchOutline} />
        <IonIcon className="w-full h-7" icon={gridOutline} />
        <IonIcon className="w-full h-7" icon={wallet} />
        <div className="w-full flex items-center justify-center">
          <NotiTabIcon />
        </div>
        <div className="w-full flex items-center justify-center">
          <DCTabIcon />
        </div>
      </div>
    </div>
  );
}
