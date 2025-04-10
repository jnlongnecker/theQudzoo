# Qud Fundamentals

---

Now that we understand what we're looking at, let's talk about Qud as a game and understand our goals and how we're going to achieve them.

## How Do I Play?

Caves of Qud is a turn-based game, which means that when it's your turn, you have as much time as you need to make your decisions. Especially when you're starting out, make sure you take your time reading the chat log, looking at the game screen and familiarizing yourself with your equipment. The biggest factor between success and failure is _not_ "What build do I have?", it's "Am I using my abilities?". It's very common for newer players to panic and forget things that their character can do because of a mutation, cybernetic, or item they picked up.

Caves of Qud can be played with mouse & keyboard or entirely with your keyboard. If you are looking to play keyboard only, I would strongly advise having a numpad as it makes movement considerably more fluid. In Caves of Qud, moving in cardinal directions ({{Y|←↑→↓}}) takes _the same amount of time_ as ordinal directions ({{Y|↖↗↘↙}}), so having a numpad makes this much easier. Enemies will absolutely take advantage of ordinal movement, so you should as well!

On your turn, you can move, bump attack, interact with something, use an ability, or change your equipment. All of these take up time which other creatures will react to by taking their turn. Some creatures don't normally move, like Mehmet in the starting village of Joppa. Some creatures will aggressively move towards you to try and rip you to pieces, and others will actively avoid you. Additionally, there is no delay in switching to your ranged weapon as it's always considered equipped. For that reason, you should always have a ranged weapon equipped and use it (likewise, if you are primarily ranged you should also have a melee weapon).

Let's return to that action "bump attack". If this is your first time in a roguelike game like Caves of Qud, this may be unfamiliar. The way you perform a basic attack is by simply walking into a hostile creature. Your character will automatically attack them, but don't worry about accidentally attacking friendly creatures! If the creature is friendly, instead of attacking them you will swap places with them if they can be moved. "If" a creature is friendly, that is; how can you tell that information?

## Parsing Creature Information

The primary way of identifying information about a creature is by using the [{{W|l}}]ook functionality. When you do, it will bring up a reticule on your character and give you information about whatever is found in the tile the reticule is on.

![Screenshot showcasing the look functionality]($assetsDir/images/fundamentals/look.png)

By default, moving around the reticule will advance it tile by tile. If you want to quickly move to creatures that are visible, you can press [{{W|f1}}] and you'll now snap to the closest creature when you move the reticule.

In the middle panel, you'll find a dense amount of information about the entity in the tile being [{{W|l}}]ooked at, in this case our player character. First, a description of the creature. Since it's us, the description is simply "It's you." but this is often times a flowery, advant-garde description of the creature. Below this you can see the equipment the creature has on. For humanoid creatures, this is important since these creatures are often defined by what they are wearing. For most creatures, this isn't that important since they don't wear anything. Finally, we have the active effects for the creature, in this case our player character is in Defensive Stance and they are `lost`, which means they cannot return to the world map until they regain their bearings by exploring zones manually.

While this panel has very dense information, while starting out it's probably not that useful. Instead, we're interested in the 3 keywords found below and above this middle panel: {{G|Friendly}}, {{w|Average}} and {{Y|Perfect}}.

-   {{G|Friendly}}
    -   This means that the creature will not only not attack you, but will attack things that attack you. If you accidentally hit them, they will give you some grace to a point before retaliating. A creature can be {{G|Friendly}}, {{Y|Neutral}}, or {{R|Hostile}}. A {{Y|Neutral}} creature will only attack if attacked first (or one of their allies), while a {{R|Hostile}} creature will actively try to kill you.
-   {{w|Average}}
    -   This means that the creatures level compared to yours is similar. There are 6 levels to this rating: {{G|Trivial}} > {{g|Easy}} > {{w|Average}} > {{W|Tough}} > {{r|Very Tough}} > {{R|Impossible}}. Generally speaking, avoid fights with anything {{r|Very Tough}} or harder. Even {{W|Tough}} fights should be treated with extreme caution, but anything more and you should probably flee.
-   {{Y|Perfect}}
    -   This is the health condition of the creature, and {{Y|Perfect}} means it is at full HP. There are 5 stages to this description: {{r|Badly Wounded}} > {{R|Wounded}} > {{W|Injured}} > {{G|Fine}} > {{Y|Perfect}}. This description can also be found at the bottom of the screen in your current target information, so be sure to check it to see how close you are to victory.

When you [{{W|l}}]ook, by default it only shows the entity at the top of the tile. However, there can be multiple things stacked on top of each other on a tile. If you want to navigate up and down the pile, you can use [{{W|+}}] and [{{W|-}}] to do so.

So now that we know we can use [{{W|l}}]ook in order to see what is hostile to us, we can now know who our enemies are and play accordingly. However, often times there are many creatures on screen at once. It would be rather cumbersome to have to check each one individually to see who is and is not hostile to us, but luckily there is an easy way to tell!

![Caves of Qud with the alt key held]($assetsDir/images/fundamentals/hostility.png)

This is a screenshot of the game with the [{{W|alt}}] key held. Neutral and friendly creatures are highlighted in {{G|green}}, our character is highlighted in {{B|light blue}}, and hostile creatures are highlighted in {{R|red}}. Additionally, objects on the map that we can interact with are highlighted in {{w|brown}}. It's highly recommended that whenever you see creatures that are new to you or are having trouble parsing out the game screen, hold the [{{W|alt}}] key to get a clear view of the most important bits of information.

## Parasangs, Zones, Tiers Oh My!

![The Qud world map]($assetsDir/images/fundamentals/worldMap.png)

The above image is the world map of Qud. You can arrive at this screen by pressing the [{{W|-}}] key from the surface (also called the overworld). However, if you are {{Y|lost}} or {{Y|Famished!}} you won't be able to, and if there are hostile creatures nearby you will also be prevented from doing so unless you are flying or they have no path to you. This is where we can start talking about the subject of this section: parasangs, zones, and zone tiers. First, let's describe the concept of a "zone". A zone is simply one game screen. When you reach the edge of the screen, you reach the edge of the zone and moving past the edge will then load up the new zone that you moved into. Simple enough!

Next, the concept of a "parasang". A parasang is 9 zones arranged in a square formation. When you look at the world map, each individual tile on the world map is 1 parasang. When you press the [{{W|+}}] key to drop into the parasang from the world map, you will be dropped into the center zone of the parasang. This is important to understand mostly because both the game and the community will talk about zones and parasangs as measures of distance, so understanding these will help you navigate the world.

> If this description was difficult to wrap your head around, starting from Joppa walk to each adjacent zone and each time go to the world map and back. You'll always go to the world map above the Joppa parasang, and when you return it'll ask you if you want to return to your current location (E, NE, N, NW, W, SW, S, SE) or to Joppa (C). Then from the world map, walk to the parasang north of Joppa and count how many screen transitions it takes to get back to the village proper as you move south.

Last, the concept of "zone tier". When you look at the world map, you'll notice there are many different tiles. These are not simply decorative, they describe the terrain you will find there and by extension the creatures that live there. As a general rule, the further east a terrain type is, the more dangerous it is. For example, the salt marsh that you begin in is further west from the Lake Hinnom, so the salt marsh is less dangerous (and considerably so!). The [wiki has a zone tier map](https://wiki.cavesofqud.com/wiki/Zone_tier) that you can reference if you are concerned about a jump in difficulty while exploring, and you can also view my [article](/advice/map-breakdown) where I break down the world map in more detail but those are outside the scope of fundamentals.

> Note that [{{W|l}}]ook functionality works on the world map too! If you see a unique tile, [{{W|l}}]ook at it to see what it is.

Not related to the concept of parasangs and zones, but it's advised that you don't do any serious cave-diving or stray too far from the salt marshes without a recoiler. A recoiler is a teleport sphere that brings you to a predefined location when activated, as long as there are no hostiles nearby with a path to you. Argyve will give you one for completing the [Weirdwire Conduit](/advice/quests/weirdwire-conduit) quest (or if you took a random village, the random village equivalent gives a recoiler).

## Money and Loot

In Qud, fresh water is the currency and it is heavy. If you've read the [Parsing the UI article](./ui), you may recall that I recommend having between 128 - 192 drams of water at any one time. The rest of your cash should be in unsold, high-value loot (most commonly guns) and {{W|trade goods}}. {{W|Trade goods}} can be identified by their {{W|yellow price color}} in the trade screen, like in the screenshot below.

![Copper nuggets in the trade screen]($assetsDir/images/fundamentals/tradeGoods.png)

The most common is the copper nugget, which you can see pictured. It is 1# and trades for 10 drams, _no matter what_, meaning that it is far more valuable for its weight. This is true for all trade goods, so you should pick them up when you find them and consider buying them from traders to lighten your load since their trade is lossless. By comparison, 1 dram of water is 0.25#, or 4 drams per #. Therefore, any item that is worth 4 times its weight is "weight efficient" and worthy of being picked up and sold. This is something that you will get a feel for as you play the game, so don't worry about that measure too much right now. Just experiment and see what measures up to this threshold, as a considerable amount of things do. A good rule of thumb is if it is or can be an unidentified artifact, it's probably weight efficient.

A common hole for newer players to get into is be constantly over-encumbered because your valuables sell for more than merchants can buy or you have yet to find an item worthy of purchase. The best fix for this is to pick up the chests you see around the world, as they only weigh 1#. You then put them down in places with many merchants like Ezra or the Six-Day Stilt and store your loot there. Then when you return to buy something and you find something worthy of purchase, you can pick up your stored valuables to buy it.

> Items you place on the floor _will never be picked up by another creature or otherwise deleted/moved_. There is 1 **important exception** to this rule, and that is the [beetlebum](https://wiki.cavesofqud.com/wiki/Beetlebum) creature. It will eat loot on the floor, which can be retrieved by killing it. If there are no beetlebum on the zone, your loot is safe.

## Useful Settings

Finally, I'll make some suggestions about settings you might be interested in fiddling with. Some of these are preferences so don't feel forced to adjust these settings if you don't want to, but it always helps to know that you _can_ adjust something even if right now you don't want to. All of these settings I'm talking about are in the options menu (`Esc` > `Options`).

### Disable Fullscreen Color Effects

In the `Accessibility` section, there is an option to turn off fullscreen color effects. I recommend doing so, as the main thing this actually does is turn off the green overlay when using night vision. It makes things far easier to parse out with this disabled and isn't so harsh on the eyes.

### Minimap and Nearby Objects

In the `UI` section, there are two options you may want to consider enabling: `Show minimap` and `Show nearby objects list`. The minimap shows a scaled-down view of the zone you're in and doesn't get scrambled when you're confused. The nearby objects list gives a list of items on the floor around you, which you can reference instead of checking all the piles. Personally, I only use the minimap but it is a very common choice to enable the objects list.

### Automation

In the `Automation` section, I recommend enabling all the options. This will make your experience more fluid while using autoexplore and you won't have to manually do many tedious things you always want to do; like disassemble scrap. You can leave the difficulty threshold for ignoring to `None`, but consider bumping this to `Easy` once you have more experience.

### Advanced Options

The next options I'll talk about require you to tick the box that says `Show advanced options` at the top near the search bar.

In the `UI` section, there is an option `Display detailed weapon penetration and damage in weapon names` option. I'd recommend enabling that option, as it makes it easier to see how close you are to the PV cap for your weapon. To make it simple, once you're at the cap, more Strength has very little effect until you start using a higher tier weapon with a higher cap.

The next options all come from the `Automation` section. Under the `Range threshold for ignoring hostile creatures`, I'd recommend setting this to at most 15, but no lower than 7. While you're still beginning, 10 or 15 should be what you reach for. This will make auto-movement get interrupted less often by creatures across the map who aren't threats yet. Right below this is the option `Attack ignored hostiles that you move adjacent to during autoexplore`; I recommend enabling this. While you shouldn't have any ignored hostiles _yet_, eventually when you start ignoring trivial enemies this will allow your character to automatically retaliate and kill them. Next, I recommend enabling `Search containers while autoexploring`. This one is pretty self-explanatory; makes sure you end up searching everything while autoexploring.

The last setting in this section is also literally the last one in the `Automation` section: `Maximum automove cells/sec and autoattack actions/sec`. This is one that heavily relies on your preference. If the automatic movement is too slow, increase this. If the automatic movement is too fast, decrease this.

Next, we have the `Autoget` section. I recommend enabling everything in this section **except** `Autoget if hostiles are nearby`; picking up items takes turns and if you have non-ignored hostiles around, you want to make sure you don't get smoked while looting.

The final section is `Prompts`, and this has options largely to your preference. I'd recommend turning off `Prompt before autowalking to stairs` but the rest are largely in your preference. The big one I want to point out is the `Threshold for low hitpoint warning`; I'd highly recommend setting it to no lower than 60%. This should give you a warning that the combat is starting to get serious and you should pay attention, making sure you have an escape route planned out and a few backup strategies.
