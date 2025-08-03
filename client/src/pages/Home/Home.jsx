import React from "react";
import {
  HomeContainer,
  HomeSection,
  TextColumn,
  ImageColumn,
  HeadlineText,
  SubHeadlineText,
  ActionButton,
  VinylImage,
} from "./Home.styles";
import Dashboard from "../Dashboard/Dashboard";

function Home() {
  return (
    <>
      <HomeContainer>
        <HomeSection>
          {/* Text Column */}
          <TextColumn>
            <p>Manage Your Music Library Effortlessly</p>
            <HeadlineText>muziqa shelf</HeadlineText>
            <SubHeadlineText>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae ipsam ipsa corrupti ad dignissimos molestiae modi
              aliquid dolor id reprehenderit similique est, explicabo iusto
              dolore. Dolore necessitatibus esse enim dicta.
            </SubHeadlineText>
            <ActionButton>
              <a href="#dashboard">Manage Songs</a>
            </ActionButton>
          </TextColumn>

          {/* Image Column */}
          <ImageColumn>
            <VinylImage src="/assets/xyz.png" alt="White vinyl record" />
          </ImageColumn>
        </HomeSection>

        <div id="dashboard">
          <Dashboard />
        </div>
      </HomeContainer>
    </>
  );
}

export default Home;
