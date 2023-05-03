import React, { useEffect, useState } from 'react';
import { MdDeviceHub } from 'react-icons/md';
import { TbDeviceNintendo } from 'react-icons/tb';
import { SiThingiverse, SiSmartthings } from 'react-icons/si';
import { GiDominoTiles } from 'react-icons/gi';
import { FaGolfBall } from 'react-icons/fa';

const iconList = [
  MdDeviceHub,
  TbDeviceNintendo,
  SiThingiverse,
  SiSmartthings,
  GiDominoTiles,
  FaGolfBall,
];

const RandomIcon = () => {
  const [randomIcon, setRandomIcon] = useState(iconList[null]);

  // const generateRandomIcon = () => {
  // };
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * iconList.length);
    setRandomIcon(iconList[randomIndex]);
    
    const chosenIcon = iconList[randomIndex];
    const remainingIcons = iconList.filter((icon) => icon !== chosenIcon);
    setRandomIcon(chosenIcon);
  }, []);

  return (
    <div>
      <div>{randomIcon}</div>
    </div>
  );
};

export default RandomIcon;
