import React, { useState, useEffect } from "react";
import Circle from "react-circle";
import { COLOR } from "../utils/ColorUtils";
import { Button, Typography } from "@material-ui/core";
import styled from "styled-components";

type Props = {};

export const Timer: React.FC<Props> = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [tomatoNum, setTomatoNum] = useState<number>(0);

  const oneSetSec = 2;

  useEffect(() => {
    return () => {
      if (seconds !== oneSetSec) return;
      console.log("a");

      setSeconds(0);
      setIsStart(false);
      setIsPause(false);
      clearInterval(Number(intervalId));
      setTomatoNum((tomatoNum) => tomatoNum + 1);
    };
  }, [seconds]);

  const handleStart = () => {
    if (isStart && !isPause) return;

    setIsPause(false);
    setIsStart(true);
    const id = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    setIntervalId(id);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsStart(false);
    setIsPause(false);
    clearInterval(Number(intervalId));
  };

  const handleStop = () => {
    setIsPause(true);
    clearInterval(Number(intervalId));
  };

  const getRemainingTime = (second: number) => {
    const min = Math.floor((oneSetSec - second) / 60);
    const sec = Math.floor(oneSetSec - min * 60 - second).toFixed();
    const secDisplay = sec.length === 1 ? "0" + sec : sec;

    return String(min) + ":" + secDisplay;
  };

  return (
    <PageContainer>
      <Typography variant="h1">
        {[...Array(tomatoNum)].map(() => "🍅")}
      </Typography>
      <UpContainer>
        <LeftContainer>
          <Circle
            percentSpacing={30}
            animationDuration="0.8s"
            lineWidth="40"
            progress={Number(((seconds * 100) / oneSetSec).toFixed(2))}
            textColor={COLOR.GREY}
            animate={true}
            progressColor={COLOR.PRIMERY_COLOR}
            roundedStroke={true}
            size="200"
          />
        </LeftContainer>
        <RightContainer>
          <Typography variant="h6" color="secondary">
            残り時間: {getRemainingTime(seconds)}
          </Typography>
        </RightContainer>
      </UpContainer>
      <DownContainer>
        <Button
          size="large"
          onClick={handleStart}
          variant="contained"
          color="primary"
        >
          スタート
        </Button>
        <Button
          onClick={handleStop}
          size="large"
          variant="outlined"
          color="primary"
        >
          ストップ
        </Button>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={handleReset}
        >
          リセット
        </Button>
      </DownContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background-color: black;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UpContainer = styled.div`
  width: 480px;
  display: flex;
`;

const LeftContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DownContainer = styled.div`
  width: 480px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
