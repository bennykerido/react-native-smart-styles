import React from 'react';
import { useTheme } from '../../index';

export default function withTheme(Component: React.FC<any>) {
  return function withTheme(props: React.ComponentProps<any>) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
}
