// import 'fomantic-ui-less/semantic.less';
import './src/assets/fomantic-less/dist/semantic.css';
import React from 'react';
import { IdentityContextProvider } from './src/components/IdentityContextProvider';

export function wrapRootElement({ element }) {
  return <IdentityContextProvider>{element}</IdentityContextProvider>;
}
