import Avatar from "@mui/material/Avatar";
import MuiAvatarGroup from "@mui/material/AvatarGroup";

type AvatarGroupProps = {
  avatars: string[];
};

const AvatarGroup = ({ avatars }: AvatarGroupProps) => {
  const avatarSize = { width: 30, height: 30 };
  return (
    <MuiAvatarGroup
      max={4}
      renderSurplus={(surplus) => <span className="text-sm">+{surplus}</span>}
      sx={{
        "& .MuiAvatar-root": avatarSize,
        "& .MuiAvatarGroup-avatar": avatarSize,
      }}
    >
      {avatars.map((avatar, index) => (
        <Avatar key={index} src={avatar} />
      ))}
    </MuiAvatarGroup>
  );
};

export default AvatarGroup;
