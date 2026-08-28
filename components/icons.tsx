import type { SVGProps } from "react";

export type IconName =
  | "accessibility"
  | "arrow-right"
  | "bell"
  | "bookmark"
  | "chart"
  | "check"
  | "chevron"
  | "clock"
  | "document"
  | "external"
  | "eye"
  | "folder"
  | "grid"
  | "lock"
  | "play"
  | "search"
  | "star"
  | "target"
  | "user";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  filled?: boolean;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: "var(--icon-stroke-width)",
};

export function Icon({ name, filled = false, className, ...props }: IconProps) {
  const classes = ["icon", className].filter(Boolean).join(" ");

  return (
    <svg
      aria-hidden="true"
      className={classes}
      focusable="false"
      viewBox="0 0 24 24"
      {...props}
    >
      {name === "accessibility" && (
        <>
          <circle cx="12" cy="5" r="2.25" {...strokeProps} />
          <path d="M5 8.5h14M12 8.5v11M8.5 20l3.5-7 3.5 7M8.5 12l-2 5M15.5 12l2 5" {...strokeProps} />
        </>
      )}
      {name === "arrow-right" && <path d="M5 12h14m-6-6 6 6-6 6" {...strokeProps} />}
      {name === "bell" && (
        <>
          {filled ? (
            <path
              d="M18.5 10.2c0-3.44-2.18-5.9-5.5-6.35V2.8a1 1 0 0 0-2 0v1.05c-3.32.45-5.5 2.91-5.5 6.35 0 4.5-1.8 5.48-2.3 6.8h17.6c-.5-1.32-2.3-2.3-2.3-6.8ZM9.6 19a2.45 2.45 0 0 0 4.8 0H9.6Z"
              fill="currentColor"
            />
          ) : (
            <>
              <path d="M18 10.25c0-3.55-2.1-5.75-6-5.75s-6 2.2-6 5.75c0 4.3-1.75 5.35-2.25 6.5h16.5C19.75 15.6 18 14.55 18 10.25Z" {...strokeProps} />
              <path d="M9.65 19a2.55 2.55 0 0 0 4.7 0" {...strokeProps} />
            </>
          )}
        </>
      )}
      {name === "bookmark" &&
        (filled ? (
          <path d="M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75V21l-6-3.5L6 21V3.75Z" fill="currentColor" />
        ) : (
          <path d="M6.5 3.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25V21l-5.5-3.25L6.5 21V3.75Z" {...strokeProps} />
        ))}
      {name === "chart" &&
        (filled ? (
          <path d="M4 19.5a1 1 0 0 1-1-1V14a1 1 0 0 1 1-1h2.3a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1H4Zm6.85 0a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1h2.3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-2.3Zm6.85 0a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2.3Z" fill="currentColor" />
        ) : (
          <>
            <path d="M4 19.5v-5.25M10.85 19.5v-10M17.7 19.5v-15" {...strokeProps} />
            <path d="M3 19.5h18" {...strokeProps} />
          </>
        ))}
      {name === "check" && (
        <>
          <circle cx="12" cy="12" r="8.5" {...strokeProps} />
          <path d="m8.5 12 2.35 2.35L15.7 9.5" {...strokeProps} />
        </>
      )}
      {name === "chevron" && <path d="m9 5 7 7-7 7" {...strokeProps} />}
      {name === "clock" && (
        <>
          <circle cx="12" cy="12" r="8.5" {...strokeProps} />
          <path d="M12 7v5l3.25 2" {...strokeProps} />
        </>
      )}
      {name === "document" &&
        (filled ? (
          <path d="M6.5 2.5h7.3L19 7.7v13.8H6.5V2.5Zm7.8 1.85v4.1h3.35" fill="currentColor" fillRule="evenodd" />
        ) : (
          <>
            <path d="M6.5 2.75h7.2l4.8 4.8v13.7H6.5V2.75Z" {...strokeProps} />
            <path d="M13.5 2.75v5h5M9.5 12h6M9.5 15.25h6" {...strokeProps} />
          </>
        ))}
      {name === "external" && <path d="M14 4h6v6m-7 1 7-7M19 13.5v4.75c0 .97-.78 1.75-1.75 1.75H5.75A1.75 1.75 0 0 1 4 18.25V6.75C4 5.78 4.78 5 5.75 5h4.75" {...strokeProps} />}
      {name === "eye" && (
        <>
          <path d="M2.75 12s3.35-5 9.25-5 9.25 5 9.25 5-3.35 5-9.25 5-9.25-5-9.25-5Z" {...strokeProps} />
          <circle cx="12" cy="12" r="2.3" {...strokeProps} />
        </>
      )}
      {name === "folder" && <path d="M3.25 6.5h6l1.8 2h9.7v9.9c0 .88-.72 1.6-1.6 1.6H4.85c-.88 0-1.6-.72-1.6-1.6V6.5Z" {...strokeProps} />}
      {name === "grid" && (
        <>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1" {...strokeProps} />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1" {...strokeProps} />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1" {...strokeProps} />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1" {...strokeProps} />
        </>
      )}
      {name === "lock" &&
        (filled ? (
          <path d="M7 10V7.8a5 5 0 0 1 10 0V10h1.25c.69 0 1.25.56 1.25 1.25v8c0 .69-.56 1.25-1.25 1.25H5.75c-.69 0-1.25-.56-1.25-1.25v-8C4.5 10.56 5.06 10 5.75 10H7Zm2.25 0h5.5V7.8a2.75 2.75 0 0 0-5.5 0V10Z" fill="currentColor" fillRule="evenodd" />
        ) : (
          <>
            <rect x="5" y="10" width="14" height="10" rx="1.5" {...strokeProps} />
            <path d="M8 10V7.75a4 4 0 0 1 8 0V10M12 14v2" {...strokeProps} />
          </>
        ))}
      {name === "play" &&
        (filled ? (
          <>
            <circle cx="12" cy="12" r="9" fill="currentColor" />
            <path d="m10 8.25 5.25 3.75L10 15.75v-7.5Z" fill="var(--color-surface)" />
          </>
        ) : (
          <>
            <circle cx="12" cy="12" r="8.5" {...strokeProps} />
            <path d="m10 8.75 5 3.25-5 3.25v-6.5Z" {...strokeProps} />
          </>
        ))}
      {name === "search" && (
        <>
          <circle cx="10.75" cy="10.75" r="6.25" {...strokeProps} />
          <path d="m15.5 15.5 4 4" {...strokeProps} />
        </>
      )}
      {name === "star" && <path d="m12 3.5 2.65 5.37 5.93.86-4.29 4.18 1.01 5.9L12 17.02l-5.3 2.79 1.01-5.9-4.29-4.18 5.93-.86L12 3.5Z" {...strokeProps} />}
      {name === "target" && (
        <>
          <circle cx="12" cy="12" r="8.5" {...strokeProps} />
          <circle cx="12" cy="12" r="4.5" {...strokeProps} />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          <path d="M12 3.5V2M20.5 12H22" {...strokeProps} />
        </>
      )}
      {name === "user" &&
        (filled ? (
          <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7.5 9.25a7.5 7.5 0 0 1 15 0h-15Z" fill="currentColor" />
        ) : (
          <>
            <circle cx="12" cy="7" r="3.25" {...strokeProps} />
            <path d="M5 20.25a7 7 0 0 1 14 0" {...strokeProps} />
          </>
        ))}
    </svg>
  );
}

export function LearnitoMark() {
  return (
    <svg
      aria-hidden="true"
      className="brand-mark"
      focusable="false"
      viewBox="0 0 32 32"
    >
      <path d="M5 4.5h7v16h15v7H5v-23Z" fill="currentColor" />
      <path d="M12 4.5h7.5L12 13V4.5Z" fill="var(--color-surface)" />
    </svg>
  );
}
