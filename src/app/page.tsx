"use client";
import Header from "@/components/expense/Header";
import Overview from "@/components/expense/Overview";
import Container from "@/utils/Container";

const HomePage = () => {
  return (
    <Container>
      <Header></Header>
      <Overview></Overview>
    </Container>
  );
};

export default HomePage;
