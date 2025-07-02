//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import Squirtle from "./imgs/Squirtle.webp";
import mimikyuu from "./imgs/mimikyu.png";
import background from "./imgs/bkgrd.jpg";
import pokedeximg from "./imgs/pokedex.png";
import PokemonCard from './Components/PokemonCard.jsx';
import Squirtlepokedex from './imgs/squirtlepokedex.png';
import munchpokedex from './imgs/munchpokedex.webp';
import mimipokedex from './imgs/mimipokedex.jpg';
import poof from './imgs/poof.gif';
import munchlax from './imgs/munchlax.gif'
import soothe from './imgs/soothe.webp'
import snorlax from './imgs/snorlax.gif'
import snorlaxpokedex from './imgs/snorlaxpokedex.webp'
import gigsnorlax from './imgs/gigsnorlax.webp'
import gigsnorlaxpokedex from './imgs/gigsnorlaxpokedex.webp'
import gigaband from './imgs/gigaband.webp'
import waterstone from './imgs/waterstone.webp'
import wartortle from './imgs/wartotlegif.gif'
import wartortlepokedex from './imgs/wartortlepokedex.webp'
import Blast from './imgs/Blast.gif'
import blastpokedex from './imgs/blastpokedex.png'
import sable from './imgs/sableye.png'
import sablepokedex from './imgs/sablepokedex.png'
import oshowat from './imgs/oshowat.gif'
import oshowatpokedex from './imgs/oshowatpokedex.webp'

function App() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const [isVisible, setIsVisible] = React.useState(false);
    const [showSquirtlePokex, setSquirtlePokedex] = React.useState(true);
    const [squirtleShowButton, squirtleSetShowbutton] = React.useState(true);
    const [showSquirtleButton, squirtleSetCard] = React.useState(false);
    const [showSquirtlePoof, setSquirtlePoof] = React.useState(false);
    const squirtleToggleButton = async () => {
        setSquirtlePoof(!showSquirtlePoof);
        setIsVisible(!isVisible);
        await delay(1000);
        squirtleSetShowbutton(!squirtleShowButton);
        setTimeout(() => {
            setSquirtlePoof(showSquirtlePoof);
            setIsVisible(isVisible);
        }, 1000);
        await delay(1000);
        squirtleSetCard(!showSquirtleButton);
    }
    const handleClickSquirtleCard = () => {
        squirtleSetCard(!showSquirtleButton);
        setSquirtlePokedex(false);
    }
    const [showWaterStone, setWaterStone] = React.useState(false);
    const toggleWaterStone = () => {
        setWaterStone(!showWaterStone);
    }


    const [showWartortle, setWartortle] = React.useState(false);
    const [showWartortlePoof, setWartortlePoof] = React.useState(false);
    const [showWartortlePokex, setWartortlePokedex] = React.useState(true);

    const toggleWartortle = async () => {
        setWartortlePoof(!showWartortlePoof);
        setIsVisible(!isVisible);
        await delay(1000);
        setTimeout(() => {
            setWartortlePoof(showWartortlePoof);
            setIsVisible(isVisible);
        }, 1000);
        await delay(1000);
        setWartortle(!showWartortle);
        WartortleSetShowButon(!showWartortleButton);

    }
    const [showWartortleButton, WartortleSetShowButon] = React.useState(false);
    const handleClickWartortleCard = () => {
        WartortleSetShowButon(!showWartortleButton);
        setWartortle(showWartortle);
        setWartortlePokedex(false);
    }

    const [showBlast, setBlast] = React.useState(false);
    const [showBlastPoof, setBlastPoof] = React.useState(false);
    const [showBlastPokex, setBlastPokedex] = React.useState(true);
    const [showWaterStoneBlast, setWaterStoneBlast] = React.useState(false);
    const toggleWaterStoneBlast = () => {
        setWaterStoneBlast(!showWaterStoneBlast);
    }
    const toggleBlast = async () => {
        setBlastPoof(!showBlastPoof);
        setIsVisible(!isVisible);
        await delay(1000);
        setTimeout(() => {
            setBlastPoof(showBlastPoof);
            setIsVisible(isVisible);
        }, 1000);
        await delay(1000);
        setBlast(!showBlast);
        BlastSetShowButon(!showBlastButton);

    }
    const [showBlastButton, BlastSetShowButon] = React.useState(false);
    const handleClickBlastCard = () => {
        BlastSetShowButon(!showBlastButton);
        setBlast(showBlast);
        setBlastPokedex(false);
    }



    const [showMimiPokex, setMimiPokedex] = React.useState(true);
    const [mimiShowButton, mimiSetShowbutton] = React.useState(true);
    const [showMimiButton, mimiSetCard] = React.useState(false);
    const [showMimiPoof, setMimiPoof] = React.useState(false);
    const mimiToggleButton = async () => {
        setMimiPoof(!showMimiPoof);
        setIsVisible(!isVisible);
        await delay(1000);
        mimiSetShowbutton(!mimiShowButton);
        setTimeout(() => {
            setMimiPoof(showMimiPoof);
            setIsVisible(isVisible);
        }, 1000);
        await delay(1000);
        mimiSetCard(!showMimiButton);
    }
    const handleClickMimiCard = () => {
        mimiSetCard(!showMimiButton);
        setMimiPokedex(false);
    }

    const [showSablePokex, setSablePokedex] = React.useState(true);
    const [sableShowButton, sableSetShowbutton] = React.useState(true);
    const [showSableButton, sableSetCard] = React.useState(false);
    const [showSablePoof, setSablePoof] = React.useState(false);
    const sableToggleButton = async () => {
        setSablePoof(!showSablePoof);
        setIsVisible(!isVisible);
        await delay(1000);
        sableSetShowbutton(!sableShowButton);
        setTimeout(() => {
            setSablePoof(showSablePoof);
            setIsVisible(isVisible);
        }, 1000);
        await delay(1000);
        sableSetCard(!showSableButton);
    }
    const handleClickSableCard = () => {
        sableSetCard(!showSableButton);
        setSablePokedex(false);
    }

    const [showOshoPokex, setOshoPokedex] = React.useState(true);
    const [oshoShowButton, oshoSetShowbutton] = React.useState(true);
    const [showOshoButton, oshoSetCard] = React.useState(false);
    const [showOshoPoof, setOshoPoof] = React.useState(false);
    const oshoToggleButton = async () => {
        setOshoPoof(!showOshoPoof);
        setIsVisible(!isVisible);
        await delay(1000);
        oshoSetShowbutton(!oshoShowButton);
        setTimeout(() => {
            setOshoPoof(showOshoPoof);
            setIsVisible(isVisible);
        }, 1000);
        await delay(1000);
        oshoSetCard(!showOshoButton);
    }
    const handleClickOshoCard = () => {
        oshoSetCard(!showOshoButton);
        setOshoPokedex(false);
    }


    const [showMunchPokex, setMunchPokedex] = React.useState(true);
    const [munchShowButton, munchSetShowbutton] = React.useState(true);
    const [showMunchButton, munchSetCard] = React.useState(false);
    const [showMunchPoof, setMunchPoof] = React.useState(false);
    const munchToggleButton = async () => {
        setMunchPoof(!showMunchPoof);
        setIsVisible(!isVisible);
        await delay(1000);
        munchSetShowbutton(!munchShowButton);
        setTimeout(() => {
            setMunchPoof(showMunchPoof);
            setIsVisible(isVisible);
        }, 1000);
        await delay(1000);
        munchSetCard(!showMunchButton);
    }
    const handleClickMunchCard = () => {
        munchSetCard(!showMunchButton);
        setMunchPokedex(false);
    }

    const [showSnorlaxPokex, setSnorlaxPokedex] = React.useState(true);
    const [showSnorlax, setSnorlax] = React.useState(false);
    const [showSnorlaxPoof, setSnorlaxPoof] = React.useState(false);

    const toggleSnorlax = async () => {
        setSnorlaxPoof(!showSnorlaxPoof);
        setIsVisible(!isVisible);
        await delay(1000);
        setTimeout(() => {
            setSnorlaxPoof(showSnorlaxPoof);
            setIsVisible(isVisible);
        }, 1000);
        await delay(1000);
        setSnorlax(!showSnorlax);
        snorlaxSetShowButon(!showSnorlaxButton);
    }
    const [showSoothe, setSoothe] = React.useState(false);
    const toggleSoothe = () => {
        setSoothe(!showSoothe);
    }
    const [showSnorlaxButton, snorlaxSetShowButon] = React.useState(false);
    const handleClickSnorlaxCard = () => {
        snorlaxSetShowButon(!showSnorlaxButton);
        setSnorlax(showSnorlax);
        setSnorlaxPokedex(false);
    }
    const [showGigSnorlax, setGigSnorlax] = React.useState(false);
    const [showGigSnorlaxCard, setGigSnorlaxCard] = React.useState(true);
    const [showGigSnorlaxPokex, setGigSnorlaxPokedex] = React.useState(true);
    const [showGigSnorlaxPoof, setGigSnorlaxPoof] = React.useState(false);
    const [showGigaBand, setGigaBand] = React.useState(false);
    const toggleGigaBand = () => {
        setGigaBand(!showGigaBand);
    }
    const toggleGigSnorlax = async () => {
        setGigSnorlaxPoof(!showGigSnorlaxPoof);
        setIsVisible(!isVisible);
        await delay(1000);
        setTimeout(() => {
            setGigSnorlaxPoof(showGigSnorlaxPoof);
            setIsVisible(isVisible);
        }, 1000);
        await delay(1000);
        setGigSnorlax(!showGigSnorlax);
    }
    const handleClickGigSnorlaxCard = () => {
        setGigSnorlaxCard(!showGigSnorlaxCard);
        setGigSnorlaxPokedex(false);
    }

       
    function SquirtleCard() {
        return (
            <div className = "cards">
                <PokemonCard pokemon={{
                    image: './src/Components/squirtlegif.gif',
                    name: "Squirtle",
                    summary: "Ash's Squirtle was originally the leader of the troublemaking 'Squirtle Squad'. This group, consisting of multiple Squirtle, was known for pranks and causing trouble. However, after Ash saved their leader from a fire, they changed their ways and became honorary firefighters, with Squirtle later joining Ash's team."
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }

    function WartortleCard() {
        return (
            <div className="cards">
                <PokemonCard pokemon={{
                    image: './src/Components/wargif.gif',
                    name: "Wartortle",
                    summary: "Wartortle is a small, bipedal, turtle-like Pokemon with a similar appearance to that of its pre-evolved form, Squirtle. Some differences are that Wartortle have developed sharper and larger claws and teeth, and that their tails are larger and fluffier than those of Squirtle's. The fur on Wartortle's tail darkens with age. "
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }
    function MimikyuuCard() {
        return (
            <div className = "cards">
                <PokemonCard pokemon={{
                    image: './src/Components/mimikyuucard.gif',
                    name: "Mimikyuu",
                    summary: "Mimikyu is a Pokemon disguised as Pikachu, a disguise that is said to be a curse. Mimikyu's true form is hidden and can cause painful shock or death if seen, making it extremely lonely. It chooses to disguise itself as Pikachu to gain popularity and make friends, as Pikachu is a beloved Pokemon."
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }

    function SableCard() {
        return (
            <div className="cards">
                <PokemonCard pokemon={{
                    image: './src/Components/sableeyecard.gif',
                    name: "Sableye",
                    summary: "Sableye is often depicted as a creature that is feared for its glowing, sinister eyes, which are said to steal people's souls. However, it's also portrayed as having a playful and mischievous side, often pulling pranks on travelers to gain their attention. This behavior is suggested to stem from loneliness, as Sableye prefer to stay in dark caves and may crave interaction."
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }

    function OshoCard() {
        return (
            <div className="cards">
                <PokemonCard pokemon={{
                    image: './src/Components/osho.gif',
                    name: "Oshawott",
                    summary: "Oshawott, as a Pokemon, is known for being playful, curious, and occasionally mischievous. He is often shown as an attention-seeking and sometimes interfering Pokemon, similar to some of Ash's other past Pokemon. Oshawott can display a wide range of emotions, including happiness, sorrow, and even a hint of selfishness."
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }
    function MunchCard() {
        return (
            <div className="cards">
                <PokemonCard pokemon={{
                    image: './src/Components/munchlaxcard.gif',
                    name: "Munchlax",
                    summary: "Munchlax is an extreme glutton who will swallow anything that looks edible whole, and is even willing to steal food from and eat other Pokemon in order to get food, unphased by the havoc it causes. Munchlax will get angry if awakened, and clinically depressed if it cannot eat."
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }

    function SnorlaxCard() {
        return (
            <div className="cards">
                <PokemonCard pokemon={{
                    image: './src/Components/snorlaxgif.gif',
                    name: "Snorlax",
                    summary: "Snorlax is renowned for its highly relaxed, lethargic, and docile nature. It's known for its love of eating and sleeping, often spending its days in one or the other. Snorlax becomes very affectionate towards its Trainer once caught."
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }

    function GigSnorlaxCard() {
        return (
            <div className="cards">
                <PokemonCard pokemon={{
                    image: './src/Components/gigsnorlaxcard.gif',
                    name: "Giga Snorlax",
                    summary: "Gigantamax Snorlax maintains Snorlax's signature laid-back, almost lethargic personality, but with a massive, almost mountain-sized scale. It's known for being incredibly lazy and only moves enough to eat and battle. Even in battle, it primarily relies on powerful, though slow, attacks, rather than agility."
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }

    function BlastCard() {
        return (
            <div className="cards">
                <PokemonCard pokemon={{
                    image: './src/Components/blastcard.gif',
                    name: "Blastoid",
                    summary: "Blastoise is portrayed as a fierce, powerful, and sometimes aggressive Pokemon, often depicted with a strong, determined demeanor. While not always explicitly described as mean, its aggressive tendencies are apparent in its combat style, particularly when using its powerful water jets for high-speed tackles.",
                }}>
                </PokemonCard>
                <div className="unclickable"></div>
            </div>
        )
    }

    return (
        <div className="everything">
            <div className="topText">

                    <button className="topbutton">
                        <img className="pokemonbinder" src='./src/imgs/pokemonbinder.png'></img>
                    </button>

                <img src='./src/imgs/findthatpokemon.png' className="topimage"></img>
            </div>
            <div className="allimgs">
                <div className="background-container">
                    <img src={background} className = "backgroundimg"></img>

                    <div className="Squirtle">
                        {squirtleShowButton && <button className="button" onClick={squirtleToggleButton}>
                            <img className="Squirtleimg" src={Squirtle}></img>
                        </button>}
                        {showSquirtlePoof && <img className="Squirtlepoof" src={poof}></img>}
                        {isVisible &&
                            <div className="unclickablepoof"></div>
                        }
                        {showSquirtleButton && <SquirtleCard />}
                        {showSquirtleButton && <button className="cardButton" onClick={handleClickSquirtleCard}><div class="btn-text">Catch me!</div></button>}
                    </div>

                    <div className="Wartotle">
                        {!squirtleShowButton && !showWaterStone &&
                            <button onClick={toggleWartortle, toggleWaterStone}>
                                <img className="waterstone" src={waterstone} ></img>
                            </button>
                        }
                        {showWaterStone && !showWartortle &&
                            <button onClick={toggleWartortle}>
                                <img className="wartortleimg" src={wartortle}></img>
                            </button>}
                        {showWartortlePoof && <img className="wartortlepoof" src={poof}></img>}
                        {isVisible &&
                            <div className="unclickablepoof"></div>
                        }
                        {showWartortle && showWartortleButton && <WartortleCard></WartortleCard>}
                        {showWartortleButton && <button className="cardButton" onClick={handleClickWartortleCard}><div class="btn-text">Catch me!</div></button>}
                    </div>

                    <div className="Blastoid">
                        {showWartortle && !showWaterStoneBlast &&
                            <button onClick={toggleBlast, toggleWaterStoneBlast}>
                                <img className="waterstoneblast" src={waterstone} ></img>
                            </button>
                        }

                        {showWaterStone && showWartortle && showWaterStoneBlast && !showBlast &&
                            <button onClick={toggleBlast}>
                                <img className="Blastimg" src={Blast}></img>
                            </button>}
                        {showBlastPoof && <img className="Blastpoof" src={poof}></img>}
                        {isVisible &&
                            <div className="unclickablepoof"></div>
                        }
                        {showBlast && showBlastButton && <BlastCard></BlastCard>}
                        {showBlastButton && <button className="cardButton" onClick={handleClickBlastCard}><div class="btn-text">Catch me!</div></button>}
                    </div>

                    <div className="mimi">
                        {mimiShowButton && <button className="button" onClick={mimiToggleButton}>
                            <img className="mimiimg" src={mimikyuu}></img>
                        </button>}
                        {showMimiPoof && <img className="mimipoof" src={poof}></img>}
                        {isVisible &&
                            <div className="unclickablepoof"></div>
                        }
                        {showMimiButton && <MimikyuuCard />}
                        {showMimiButton && <button className="cardButton" onClick={handleClickMimiCard}><div class="btn-text">Catch me!</div></button>}
                    </div>

                    <div className="sable">
                        {sableShowButton && <button className="button" onClick={sableToggleButton}>
                            <img className="sableimg" src={sable}></img>
                        </button>}
                        {showSablePoof && <img className="sablepoof" src={poof}></img>}
                        {isVisible &&
                            <div className="unclickablepoof"></div>
                        }
                        {showSableButton && <SableCard />}
                        {showSableButton && <button className="cardButton" onClick={handleClickSableCard}><div class="btn-text">Catch me!</div></button>}
                    </div>

                    <div className="osho">
                        {oshoShowButton && <button className="button" onClick={oshoToggleButton}>
                            <img className="oshoimg" src={oshowat}></img>
                        </button>}
                        {showOshoPoof && <img className="oshopoof" src={poof}></img>}
                        {isVisible &&
                            <div className="unclickablepoof"></div>
                        }
                        {showOshoButton && <OshoCard />}
                        {showOshoButton && <button className="cardButton" onClick={handleClickOshoCard}><div class="btn-text">Catch me!</div></button>}
                    </div>

                    <div className="munch">
                        {munchShowButton && <button className="button" onClick={munchToggleButton}>
                            <img className="munchimg" src={munchlax}></img>
                        </button>}
                        {showMunchPoof && <img className="munchpoof" src={poof}></img>}
                        {isVisible &&
                            <div className="unclickablepoof"></div>
                        }
                        {showMunchButton && <MunchCard />}
                        {showMunchButton && <button className="cardButton" onClick={handleClickMunchCard}><div class="btn-text">Catch me!</div></button>}
                    </div>

                    <div className="snorlax">
                        {!munchShowButton && !showSoothe &&
                            <button onClick={toggleSnorlax, toggleSoothe}>
                                <img className="soothe" src={soothe} ></img>
                            </button>
                        }
                        {showSoothe && !showSnorlax &&
                            <button onClick={toggleSnorlax}>
                            <img className="snorlaximg" src={snorlax}></img>
                            </button>}
                        {showSnorlaxPoof && <img className="snorlaxpoof" src={poof}></img>}
                        {isVisible &&
                            <div className="unclickablepoof"></div>
                        }
                        {showSnorlax && showSnorlaxButton && <SnorlaxCard></SnorlaxCard>}
                        {showSnorlaxButton && <button className="cardButton" onClick={handleClickSnorlaxCard}><div class="btn-text">Catch me!</div></button>}
                    </div>
                    <div className="gigSnorlax">
                        {showSnorlax && !showGigaBand &&
                            <button onClick={toggleGigaBand}>
                                <img className="gigaband" src={gigaband}></img>
                            </button>}
                        {showSoothe && showSnorlax && showGigaBand && !showGigSnorlax &&
                            <button onClick={toggleGigSnorlax}>
                                <img className="gigsnorlaximg" src={gigsnorlax}></img>
                            </button>
                        }
                        {showGigSnorlaxPoof && <img className="gigsnorlaxpoof" src={poof}></img>}
                        {isVisible &&
                            <div className="unclickablepoof"></div>
                        }
                        {showGigSnorlax && showGigSnorlaxCard && <GigSnorlaxCard></GigSnorlaxCard>}
                        {showGigSnorlax && showGigSnorlaxCard && <button className="cardButton" onClick={handleClickGigSnorlaxCard}><div class="btn-text">Catch me!</div></button>}
                    </div>
                </div>


                <div className="pokedex-container">
                    <img src={pokedeximg} className="pokedeximg"></img>
                    {showSquirtlePokex && <img src={Squirtlepokedex} className="Squirtlepokedex"></img>}
                    {!showSquirtlePokex && <img src={Squirtlepokedex} className="SquirtlepokedexActive"></img>}
                    {showMimiPokex && <img src={mimipokedex} className="mimipokedex"></img>}
                    {!showMimiPokex && <img src={mimipokedex} className="mimipokedexActive"></img>}
                    {showMunchPokex && <img src={munchpokedex} className="munchpokedex"></img>}
                    {!showMunchPokex && <img src={munchpokedex} className="munchpokedexActive"></img>}
                    {showSnorlaxPokex && <img src={snorlaxpokedex} className="snorlaxpokedex"></img>}
                    {!showSoothe && !showSnorlax &&
                        <div className="snorlaxhint"></div>
                    }
                    {!showSoothe && !showSnorlax && !showMunchPokex &&
                    <div className="snorlaxhint">Find the SoothStone to evolve Munchlax and unlock me!</div>
                    }
                    {!showSnorlaxPokex && <img src={snorlaxpokedex} className="snorlaxpokedexActive"></img>}
                    {showGigSnorlaxPokex && <img src={gigsnorlaxpokedex} className="gigsnorlaxpokedex"></img>}
                    {!showGigaBand && !showGigSnorlax &&
                        <div className="gigahint"></div>
                    }
                    {!showGigaBand && !showGigSnorlax && !showSnorlaxPokex &&
                        <div className="gigahint">Find the GigaBand to evolve Snorlax and unlock me!</div>
                    }
                    {!showGigSnorlaxPokex && <img src={gigsnorlaxpokedex} className="gigsnorlaxpokedexActive"></img>}
                    {showWartortlePokex && <img src={wartortlepokedex} className="wartortlepokedex"></img>}
                    {!showWaterStone && !showWartortle &&
                        <div className="wartortlehint"></div>
                    }
                    {!showWaterStone && !showWartortle && !showSquirtlePokex &&
                        <div className="wartortlehint">Find the WaterStone to evolve Squirtle and unlock me!</div>
                    }
                    {!showWartortlePokex && <img src={wartortlepokedex} className="wartortlepokedexActive"></img>}
                    {showBlastPokex && <img src={blastpokedex} className="blastpokedex"></img>}
                    {!showWaterStoneBlast && !showWartortle &&
                        <div className="blasthint"></div>
                    }
                    {!showWaterStoneBlast && !showBlast && !showWartortlePokex &&
                        <div className="blasthint">Find the WaterStone to evolve Wartortle and unlock me!</div>
                    }
                    {!showBlastPokex && <img src={blastpokedex} className="blastpokedexActive"></img>}
                    {showSablePokex && <img src={sablepokedex} className="sablepokedex"></img>}
                    {!showSablePokex && <img src={sablepokedex} className="sablepokedexActive"></img>}

                    {showOshoPokex && <img src={oshowatpokedex} className="oshopokedex"></img>}
                    {!showOshoPokex && <img src={oshowatpokedex} className="oshopokedexActive"></img>}

                </div>
            </div>
        </div>
    );

}
export default App;
