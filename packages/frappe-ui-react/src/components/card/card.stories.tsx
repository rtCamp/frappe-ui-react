import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "../button";

export default {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
};

export const Basic = () => (
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>This is a card description.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>This is the main content of the card.</p>
    </CardContent>
    <CardFooter>
      <Button>Action</Button>
    </CardFooter>
  </Card>
);
