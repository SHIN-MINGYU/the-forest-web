import ReactDom from "react-dom";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const PortalToGNB = ({ children }: Props) => {
  const gnb = document.querySelector("#gnb");
  return ReactDom.createPortal(children, gnb!);
};

export default PortalToGNB;
