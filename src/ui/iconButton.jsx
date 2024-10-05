import PropTypes from "prop-types";
export default function IconButton({
  type,
  size = "large",
  text,
  align = "text-first",
  icon,
  handler,
  bgColor = "transparentPrimary",
  bgHoverColor = "primary",
  color = "white",
  colorHover = "white",
}) {
  return (
    <button
      onClick={handler}
      className={`flex gap-1 items-center text-${color}  ${
        size === "small" ? "px-2 py-1 text-sm" : " px-3 py-1"
      } ${
        type === "outlined"
          ? `bg-transparent border border-1  border-gray-300   hover:font-bold`
          : `border border-1 rounded-lg bg-${bgColor}  hover:bg-${bgHoverColor}  hover:text-${colorHover}`
      }   `}
    >
      {align === "text-first" ? (
        <>
          <span>{text}</span>
          {icon}
        </>
      ) : (
        <>
          {icon}
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
IconButton.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string,
  align: PropTypes.string,
  icon: PropTypes.element,
  handler: PropTypes.func,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
  color: PropTypes.string,
  colorHover: PropTypes.string,
};
