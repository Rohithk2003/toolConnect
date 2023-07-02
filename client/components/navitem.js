import Link from "next/link";

export default function NavItem({ text, href}) {
  return (
    <Link href={href}>
      <p
        className={`nav_item font-[200] hover:text-gray-500 overflow-hidden transition duration-300  text-ellipsis whitespace-nowrap`}
      >
        {text}
      </p>
    </Link>
  );
}
