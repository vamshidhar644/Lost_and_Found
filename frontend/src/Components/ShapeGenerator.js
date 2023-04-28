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
  const [randomIcon, setRandomIcon] = useState(iconList[0]);

  // const generateRandomIcon = () => {
  // };
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * iconList.length);
    setRandomIcon(iconList[randomIndex]);
  }, []);

  return (
    <div>
      <div>{randomIcon}</div>
    </div>
  );
};

export default RandomIcon;
