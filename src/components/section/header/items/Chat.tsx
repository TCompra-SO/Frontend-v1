export default function Chat({ forDropdown }: { forDropdown?: boolean }) {
  return (
    <div>
      <i
        className={`fa-regular fa-messages  ${
          forDropdown ? "i-main " : "i-opt"
        }`}
      ></i>
      {!forDropdown && <b className="i-notf"></b>}
    </div>
  );
}
