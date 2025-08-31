"use client";

import * as React from "react";

import { Container } from "@/components/Container";
import { Header } from "@/components/navigation/header";

export const TTTHeader: React.FC = () => {
  return (
    <Header>
      <Container className="flex items-center justify-center">
        <h2 className="text-xl font-bold">Tic Tac Toe</h2>
      </Container>
    </Header>
  );
};
