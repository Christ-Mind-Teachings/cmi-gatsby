import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import { gsap } from 'gsap';

const StyledImage = styled(Image)`
  & .gsap-hover {
    box-shadow: 1rem 1rem 1rem;
  }
`;

export default function CoverAnimator(props) {
  const { image } = props;
  function mouseOver(e) {
    e.target.classList.add('gsap-hover');
    gsap.to(e.target, {
      duration: 0.2,
      scale: '1.1',
    });
  }

  function mouseOut(e) {
    gsap.to(e.target, {
      duration: 0.2,
      scale: '1.0',
    });
    e.target.classList.remove('gsap-hover');
  }

  return (
    <StyledImage
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      src={image}
      size="medium"
      wrapped
      ui={false}
    />
  );
}
