# Qud Fundamentals

---

## Parsing the UI

When you load up your copy of Caves of Qud and spin up a character, you'll be faced with quite a bit of information at once. Let's just take a look at the screen to see what is going on and parse out the information that is there and what is most relevant. Click on the image below to expand it if you need a better view.

![Screenshot of Caves of Qud in Joppa]($assetsDir/images/fundamentals/overview.png)

We'll go over the information from top to bottom. First, we have the image of our character at the top left and their name. Take this moment to find the corresponding icon on the game screen below; this is where our character stands relative to everything else. The name is purely for flavor, you will give it out to many creatures on your journey and they will refer to you as such.

Moving to the right, the next piece of information is our temperature `T:25°`. This is the ambient temperature in Celsius as felt by our character, and is normally always exactly 25 degrees. If it is lower or higher, something is heating your up or cooling you down. Generally speaking, this will only happen because some creature is lighting you on fire or freezing you with some ability but there is a dungeon that gets very cold (Bethesda Susa). Typically, you can ignore this as it won't change but if you notice you are on fire, frozen, or moving slower than you expect then check your temperature to see how bad it is.

Next, we have <span class="attribute willpower">Sated Quenched</span>. This is actually 2 different pieces of information: how hungry you are and how thirsty you are. Caves of Qud has both mechanics, but luckily managing them isn't quite as tedious as many survival games are. For hunger, there are 3 levels: `Sated` > `Hungry` > `Famished!`.

> If you have Photosynthetic Skin, the `Famished!` level is replaced by `Wilted!`. They're the same, just have different names for flavor.

If you're `Sated`, you don't need to eat. You can still eat up to 2 more times if you're `Sated`, but after that you'll have to wait until you're `Hungry` in order to eat again. Unless you are Carnivorous, you cannot eat corpses unless you're `Famished!`. If you're `Hungry`, nothing changes but you can eat again. If you're `Famished!`, then you now have a 10 point debuff to your Quickness, which means (roughly) that every 10 turns, you lose a turn.

> Note that nothing happens when `Famished!` except for the Quickness debuff. You are under no time pressure to eat; nothing else will happen to you.

All you need to do is make a campfire using the Make Camp skill and use that to cook. Many campfires already exist in the world as well as ovens, so you may alternatively use those to cook. You'll get a popup telling you that you're `Famished!`, so don't worry about this mechanic too much. Eat when you need to. There are skills you can get to make more use out of the eating mechanic; with the skills meals now become temporary buffs as basically a sort of potion mechanic.

For thirst, there are 5 levels: `Tumescent` > `Quenched` > `Thirsty` > `Parched` > `Dehydrated!`.

> If you are Amphibious, these levels are replaced by `Soaked` > `Wet` > `Moist` > `Dry` > `Dessicated!`. Again, they are the same just differently named for flavor.

Thirst is automatically taken care of for you as long as you have fresh water in your inventory. Depending on your settings, you will drink to maintain a certain threshold. If you fall below that threshold, you will drink to bring you above it. You can manually drink too, but there's no reason to do so. In fact, you can drink _too much_, in which case you will vomit. If you are `Dehydrated!`, you will constantly take damage so make sure that you maintain some water in your inventory.

> Some creatures are capable of changing your thirst levels, but the main one you will encounter are [Thirst Thistles](https://wiki.cavesofqud.com/wiki/Thirst_thistle).

Beside your hunger and thirst we have 3 numbers: `63/318#` <span class="attribute intelligence">35$</span>. The `63/318#` ratio is the weight of all your items that are currently equipped or in your inventory to the total weight you can carry. In this case, our carry capacity is 318 pounds due to our Strength score and our items cumulatively weigh 63 pounds. If the weight of your items exceeds your capacity, you will no longer be able to move. You may still use certain abilities to move or teleport, but basic movement will be impossible until you can handle the weight.

The <span class="attribute intelligence">35$</span> is the amount of fresh water we currently have in our inventory in a unit of measure called drams. You can think of 1 dram of liquid being the smallest divisible unit in Qud. When you're thirsty, you drink 1 dram of water. The smallest amount you can pay for things is 1 dram. In this case, we have 35 drams of water, so we can drink 35 times before we run out. A waterskin or canteen can hold 64 drams of liquid and you'll start out with multiple in your inventory. Water management is something that can be confusing at the start, so let me make it really simple: try to carry about 128 drams of water (2 waterskins). If you're below 50, try not to travel more than 10 tiles away from a town. Carrying more than 192 drams is overkill and water can get heavy.

We'll come back to the 5 numbers that come next and move all the way to `Harvest Dawn 6th of Nivvun Ut`. This is the current date and the relative time of day, and is really just flavor text. Nobody will ever ask you to be somewhere on a certain day, but quests will sometimes ask you to wait a certain number of days. You can use this to keep track of when you need to return. For example, if someone asked us to come back to them 3 days from now, we would return on the 9th. Finally, we have the name of the current zone we're in: `Joppa`. We'll talk more about zones and parasangs later, but just know that every zone has a name and this is displayed here.

## Statistics

We'll now return to those funny 5 numbers: `QN: 100 MS: 120 AV: 3 DV 5 MA: 5`. These are your combat statistics, and each one has significant impact on how well combat goes for you.

### Quickness (QN)

The first number is quickness. For most of you, this will be 100. It can be improved with equipment, mutations like Heightened Quickness, and the rare liquid sunslag. Without getting too caught in the details, quickness can be thought of as the following: At what % efficiency do I perform actions in general? If you have 100 quickness, you perform at 100% efficiency. If you have 90 quickness, you perform at 90% efficiency, meaning that every 10 turns you lose a turn. If you have 110 quickness, you perform at 110% efficiency; this time meaning that every 10 turns you _gain_ a turn. As you may imagine, this is extremely powerful and is one of the most powerful stats you could have.

### Movement Speed (MS)

The second number is your movement speed. There are far more ways to improve your movement speed, but where quickness is the efficiency at which you perform _any_ action, movement speed is the efficiency you perform specifically movement actions. Only basic moves are considered here, so if you have a skill that moves you like Charge or Jump, movement speed doesn't affect that. Something useful to note here is that quickness stacks with movement speed for movement actions, so having both high quickness and high movement speed will make you move faster than if you had just one or the other.

### Armor Value (AV)

There is a _lot_ to discuss when it comes to AV as it's one of Qud's most complex mechanics but I'll make it as simple as I can here. The third number is your armor value, which represents how hard it is for weapons to pierce your armor and deal damage to you. Generally speaking, a weapon with a penetration value (PV) can be expected to reliably pierce an AV of equal value. Your AV is the sum of the AV granted to you by your armor (+1 if you have the Calloused skill).

### Dodge Value (DV)

The fourth number is your dodge value, which represents how hard it is for you to be hit in general. The way rolls to hit work is that a random number from 1-20 is rolled. The attacker's Agility modifier is added (plus other bonuses if they're available) and if the total is equal to or higher than the target's DV, the attack hits. Once an attack hits, it must roll past the AV of the target in order to deal damage and proc any effects that occur on penetration. Note that some damaging effects proc on _hit_ only, and some effects (like explosions) don't even have to hit. Your DV is the sum of the DV granted to you by your armor, plus your Agility modifier and any bonuses from skills you may have.

#### AV or DV?

This is again a pretty complicated topic so I'll try and make it simple while you're still beginning. DV is all or nothing and very swingy. It is very unreliable as when you get hit, you will often get hit extremely hard. All it takes are a few lucky hits and your character can die, and when you will be getting attacked thousands of times in a single run it's bound to happen. Therefore, it's a bad idea to not have good AV as well. How _much_ AV you should go for is where the debate stems from so I'll provide you a baseline that you can jump off from as you gain more experience in more runs.

At the start of the game, you want to get to 6 AV as soon as you can. Once you have 6 AV, you can think of every point of AV as being worth 2 points of DV. If the ratio is bad, it may not be worth the trade-off. Under 10 DV, you're not missing much by going lower so if you can't reach 12 DV or so with your gear setup, boost your AV as much as you can. A safe AV to hit in the mid game is 10 AV; at this point if you have a very high DV you can reasonably take hits to where you won't instantly splatter if you get hit by a hard-hitting attack. Any DV past 25 is better spent towards AV as the creatures that can hit 25 DV _at all_ can hit it extremely easy due to the massive to-hit bonuses they have.

### Mental Armor (MA)

The fifth and final number is your mental armor, which represents how resistant you are to mental attacks. Psychic abilities will roll against your MA instead of your AV, so this number is literally just your AV for mental attacks. This is improved by your Willpower modifier, the Mental Mirror mutation and by some pieces of high-level equipment, so generally speaking you can't do much about this for the majority of the game.
