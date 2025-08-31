"use client";

import * as React from "react";
import { AppLogo } from "../AppLogo";
import { PlayAsGuestOption } from "./PlayAsGuestOption";
import { DisplayThis } from "../DisplayThis";
import Link from "next/link";

interface AuthWrapperHeaderProps {
  title: string;
  description: string;
}

type AuthWrapperFooterProps =
  | {
      asChildren: true;
      children: React.ReactNode;
      text?: never;
      linkText?: never;
      linkHref?: never;
    }
  | {
      asChildren: false;
      children?: never;
      text: string;
      linkText: string;
      linkHref: string;
    };

type AuthWrapperProps = {
  header: AuthWrapperHeaderProps;
  children: React.ReactNode;
  showPlayAsGuestOption?: boolean;
} & (
  | { showFooter: true; footer: AuthWrapperFooterProps }
  | { showFooter: false; footer?: never }
);

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  header,
  showPlayAsGuestOption = false,
  children,
  showFooter = false,
  footer,
}) => {
  return (
    <>
      <AuthWrapperHeader {...header} />
      {children}
      {showFooter && footer && <AuthWrapperFooter {...footer} />}
      <DisplayThis when={showPlayAsGuestOption}>
        <PlayAsGuestOption />
      </DisplayThis>
    </>
  );
};

export const AuthWrapperHeader: React.FC<AuthWrapperHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="space-y-2 text-center">
      <AppLogo />
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export const AuthWrapperFooter: React.FC<AuthWrapperFooterProps> = ({
  asChildren = false,
  children,
  text,
  linkText,
  linkHref,
}) => {
  return asChildren ? (
    <>{children}</>
  ) : (
    <div className="text-center">
      <p className="text-muted-foreground">
        {text}{" "}
        <Link
          href={linkHref!}
          className="text-secondary-foreground hover:text-secondary-foreground/80 font-medium transition-colors"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
};
