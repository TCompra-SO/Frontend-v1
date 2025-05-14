import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import NoContentModalContainer from "../../containers/NoContentModalContainer";
import {
  mainModalScrollStyle,
  mediumPlusModalWidth,
} from "../../../utilities/globals";

interface TermsAndConditionsModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function TermsAndConditionsModal(
  props: TermsAndConditionsModalProps
) {
  const { t } = useTranslation();

  return (
    <NoContentModalContainer
      destroyOnHidden={true}
      width={mediumPlusModalWidth}
      open={props.isOpen}
      style={mainModalScrollStyle}
      closable={true}
      maskClosable={true}
      onClose={props.onClose}
    >
      <div className="modal-card">
        <div className="t-flex alert-base">
          <h1>{t("termsAndConditions")}</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac
            aliquet lorem. Aliquam porta tristique nisi porta rhoncus. Quisque
            ultricies porta est ac dapibus. Aenean vel magna at dolor vestibulum
            sollicitudin in ut urna. Maecenas eget ex vitae ante pretium
            sagittis. Praesent porttitor sem et libero mollis sollicitudin. Nunc
            consequat libero lacus, a lacinia tellus laoreet in. Sed et dui
            orci. Praesent id sagittis enim. Maecenas vel ultrices nisi. Vivamus
            nec quam ac quam rutrum porttitor. Donec non rhoncus augue. Aliquam
            mollis lacus at arcu interdum, in pretium ex pretium. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Quisque finibus mi nunc, at aliquam leo suscipit non.
            Sed viverra porttitor arcu sed efficitur. Pellentesque porta mauris
            quis nisi rhoncus semper. Donec in convallis mi. Proin leo mauris,
            placerat eget lorem quis, pellentesque pharetra quam. Fusce
            vestibulum, lacus et auctor convallis, enim lectus ultrices turpis,
            ac volutpat dui erat ac sem. Nam gravida ante et purus suscipit, non
            molestie risus hendrerit. In efficitur vehicula risus id suscipit.
            Donec luctus erat sed eros dapibus maximus. Sed tincidunt in urna
            fringilla viverra. In nec vulputate ligula. Aenean convallis
            pulvinar purus, at auctor nisl pulvinar et. Donec accumsan nibh
            orci. Vestibulum at erat id ligula auctor viverra. Praesent finibus
            sodales urna ut hendrerit. Aenean eros odio, pulvinar at condimentum
            at, eleifend eu sapien. Etiam lacus neque, tempor eget neque et,
            condimentum vestibulum lacus. Duis id tincidunt ligula. Integer eget
            feugiat nunc. Nullam iaculis eros sed massa porta ultrices. Quisque
            eu dolor tellus. Fusce ullamcorper massa nec augue sagittis
            placerat. Nulla dignissim tellus congue tellus pretium, ut dapibus
            enim luctus. Nulla at efficitur neque. Curabitur eu massa ac sem
            dapibus condimentum a et est. Nulla ut pulvinar metus. Aenean
            suscipit, quam et porta sollicitudin, erat velit mattis arcu, in
            blandit libero enim vel libero. Pellentesque aliquam ex sed nisi
            finibus fringilla. Sed vestibulum commodo luctus. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Etiam tortor arcu, ullamcorper nec bibendum ac,
            vulputate consectetur elit. Quisque vel facilisis nunc, at aliquam
            tortor. Donec vitae sodales lectus, sit amet suscipit justo. Nam
            vitae dolor non elit lobortis pharetra non nec sem.
          </div>
          <div className="t-flex gap-15 wd-100 alert-btn">
            <ButtonContainer
              onClick={() => props.onClose()}
              children={t("acceptButton")}
              className="btn btn-default alert-boton"
            />
          </div>
        </div>
      </div>
    </NoContentModalContainer>
  );
}
