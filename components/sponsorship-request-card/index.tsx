import { MoreVert } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import AvatarGroup from "../avatar-group";
import { Dot } from "../dots";
import { Pill } from "../pills";
import Popover from "../popover";

export type SponsorshipRequestCardProps = {
  onEditClick: () => void;
  coverImage?: string;
  dateCreated: string;
  title: string;
  donationProgress: number;
  description: string;
  orphans: string[];
  status: string;
};

const SponsorshipRequestCard = ({
  onEditClick,
  coverImage,
  dateCreated,
  title,
  donationProgress,
  description,
  orphans,
  status,
}: SponsorshipRequestCardProps) => {
  return (
    <div className="relative flex flex-col rounded-xl bg-white">
      <div
        className="bg-gray-200 rounded-tl-xl rounded-tr-xl"
        style={{ backgroundImage: `url('${coverImage}')`, height: "100px" }}
      ></div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-sm">{title}</p>
          <div className="flex items-center text-xs">
            <Dot />
            {dateCreated}
          </div>
        </div>
        <LinearProgress
          color="info"
          variant="determinate"
          value={donationProgress}
        />
        <p className="text-xs">{description}</p>
        <div className="flex justify-between">
          <Pill text={status} />
          <AvatarGroup avatars={orphans} />
        </div>
      </div>
      <div className="absolute top-5 right-5 bg-white rounded-full p-1">
        <Popover
          triggerButton={<MoreVert className="cursor-pointer" />}
          moreOptions={[
            { name: "Edit", onClick: onEditClick },
            { name: "View", onClick: onEditClick },
            { name: "Delete", onClick: onEditClick },
            { name: "Share", onClick: onEditClick },
          ]}
        />
      </div>
    </div>
  );
};

export default SponsorshipRequestCard;
