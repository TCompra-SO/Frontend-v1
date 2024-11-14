export default function Notification({
  forDropdown,
}: {
  forDropdown?: boolean;
}) {
  return (
    <div>
      <i
        className={`fa-regular fa-bell  ${forDropdown ? "i-main " : "i-opt"}`}
      ></i>
      {!forDropdown && <b className="i-notf"></b>}
    </div>
  );
}
