import { CrownFilled } from "@ant-design/icons";
import TagContainer from "../../../containers/TagContainer";

export default function Premium() {
  return (
    <TagContainer
      text={
        <>
          <CrownFilled /> Premium
        </>
      }
      color="#ffbf00"
      style={{ fontWeight: "bold" }}
    />
  );
}
