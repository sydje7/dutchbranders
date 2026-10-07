"use client";

import Link from "next/link";
import { Avatar, looks } from "./Avatar";
import { useI18n } from "./I18n";

export default function ChatWidget() {
  const { dict, href } = useI18n();
  return (
    <Link href={href("/contact")} className="chat">
      <span className="avatar-wrap">
        <Avatar look={looks.glasses} />
        <i className="online" />
      </span>
      <span>
        <strong>{dict.chat.title}</strong>
        <span>{dict.chat.sub}</span>
      </span>
    </Link>
  );
}
