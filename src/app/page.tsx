// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { getCount, saveCount } from "@/lib/indexddb";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 0.5em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Count = styled.p`
  font-size: 1.5em;
  color: #666;
  margin: 0.5em 0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75em 1.5em;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default function Home() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const savedCount = await getCount();
      setCount(savedCount);
    })();
  }, []);

  const handleIncrement = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await saveCount(newCount);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>カウントアップアプリ</Title>
        <Count>カウント: {count}</Count>
        <Button onClick={handleIncrement}>カウントアップ</Button>
      </Container>
    </>
  );
}
