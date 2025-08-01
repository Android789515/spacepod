import type { BaseLinkProps } from 'react-router5/dist/BaseLink';

import { BaseLink } from 'react-router5';

import styles from './Link.module.css';

interface Props extends BaseLinkProps {
  readonly isLinkableElement?: boolean;
}

export const Link = ({ isLinkableElement, ...rest }: Props) => {
  return (
    <BaseLink
      {...rest}
      router={rest.router}
      routeName={rest.routeName}
      className={`
        ${isLinkableElement && styles.linkableElement}
      `}
    >
      {rest.children}
    </BaseLink>
  );
};

