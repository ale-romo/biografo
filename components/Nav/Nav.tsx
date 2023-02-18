import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import useEscape from "lib/hooks/useEscape";
import { useUser } from 'components/Session/user';

interface NavProps {
  active: boolean;
}

const StyledHamburgerButton = styled.button<NavProps>`
  background: black;
  color: white;
  width: 40px;
  height: 40px;
  border: none;
  position: relative;
  padding: 10px;
  z-index: 2;
  cursor: pointer;
  &:before, &:after {
    content: '';
    background: white;
    left:25%;
    width: 60%;
    height: 4px;
    position: absolute;
    display: block;
    transition: transform 0.2s;
  }
  &:before {
    top: 13px;
    transform: rotate(${p => p.active ? '-45deg' : 0}) translate(-2px, ${p => p.active ? '5px' : 0});
  }
  &:after {
    bottom: 13px;
    transform: rotate(${p => p.active ? '45deg' : 0}) translate(-2px, ${p => p.active ? '-5px' : 0});;
  }
`;

const StyledNav = styled.ul<NavProps>`
  width: 100%;
  left: ${p => p.active ? 0 : '-100%'};
  height: 100%;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 1;
  margin: 0;
  transition: left 0.4s;
  align-items: center;
  list-style: none;
  padding: 40px;
  li {
    font-weight: bold;
    padding-bottom: 15px;
    &:last-child {
      padding-bottom: 0;
    }
  }
`;

interface Item {
  title: string;
  url: string;
};

interface Props {
  items: Item[];
}

const Nav = (Props: Props) => {
  const [active, setActive] = useState(false);
  useEscape(() => !active && setActive(false));
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      if (active) {
        body.classList.add('frozen');
      } else {
        body.classList.remove('frozen');
      }
    }
  }, [active]);

  const user = useUser();
  console.log(user)

  return <>
      <StyledNav active={active}>
      {Props.items.map((item: Item, i) => <li key={i}>
        <Link href={item.url} title={item.title}>
          <a href={item.url} onClick={() => setActive(false)}>{item.title}</a>
        </Link>
      </li>)}
      {user.username}
    </StyledNav>
    <StyledHamburgerButton active={active} onClick={() => setActive(!active)} />
  </>
}

export default Nav;
