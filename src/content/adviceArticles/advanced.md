# Advanced Mechanics

---

The wiki does a decent job at explaining these mechanics, but doesn't get everything completely right leading to some confusion I've seen several times before. Most of this is not at all important to know, but if you're a big curious nerd like me then let's get deep into the weeds on the most complex Qud mechanics.

## AV and PV

References

<span class="code-reference">XRL.Rules.Stat.RollDamagePenetrations()</span>

<span class="code-reference">XRL.World.Combat.MeleeAttackWithWeaponInternal()</span>

<span class="code-reference">XRL.World.Parts.MeleeWeapon</span>

<span class="code-reference">XRL.World.Parts.MissileWeapon</span>

<span class="code-reference">XRL.World.GetMissileWeaponPerformanceEvent</span>

<span class="code-reference">Items.xml</span>

---

First off, let's get something straight: the game lies to you. When it comes time to display PV to you, you don't _actually_ have the PV it says you do. Instead, you have 4 less. If I were to guess the reason this is, if you saw 6 PV vs 10 AV and had a cursory understanding of these mechanics you might assume (incorrectly) that you'd very rarely get a penetration. This "4" is a magic number chosen by the devs to try and more accurately convey to you, the player, what AV you have a reasonable chance of penetrating.

Now that we have that straight, let's get to how these numbers are calculated. The simple one is AV: it's the sum of the bonuses provided by your equipment (averaged across limb type), plus the permanent AV bonuses from neutron flux, plus 1 if you have Calloused, plus temporary bonuses like when your Shield blocks or you tighten your Carapace, minus any AV penalties (like Cleave stacks). AV cannot be lower than 0.

PV can be considered with three values: effective PV, maximum PV and actual PV. Your maximum PV is determined by your weapon; each weapon has a "strength bonus cap" that you can find when you look at the weapon. This value is pretty well-named but isn't the whole picture, as we'll come to find out. Without any circumstantial bonuses, your effective PV is your Strength modifier, capped at maximum PV. When displayed to you, both effective PV and maximum PV are raised by 4 like mentioned above. Your actual PV is what your PV would be without any caps and is never displayed to you.

Any circumstantial bonus to PV like the sharp mod, the bonus from a two-handed weapon, critical hits and skills like Charge and Slam (not an exhaustive list) raise _all 3 values_ by the same amount. Let's apply this with an example:

> In order to see the detailed PV stats I'll be referencing, make sure to enable it in the options with `Show advanced options` enabled: `UI` > `display detailed weapon penetration and damage in weapon names`.

A one-handed carbide weapon has a Strength bonus cap of 4. Let's say our character has a Strength modifier of 3. In the PV stats, it will read <span class="stat pv"></span>`7/8`. Let's now mod this weapon to be sharp. All numbers raise by 1, so our new readout is <span class="stat pv"></span>`8/9`. Swapping to a two-handed weapon gives a flat +1 to PV; and let's say this is also modded to be sharp so our new readout is <span class="stat pv"></span>`9/10`.

Non-bow ranged weapons work slightly differently; they just have a flat PV determined by the weapon, unaffected by ammunition. Bows have a PV determined by the arrow, the compound bow adds your Strength modifier to this number and the turbow adds 4 _and_ your Strength modifier. The only other thing that affects ranged weapon PV are critical hits.

Vibro weapons will set your effective PV, maximum PV and actual PV to the AV of the target. Note that those are not the _displayed_ values, those are the _actual_ values being set to the target's AV. This occurs before any bonuses that melee weapons get (Charge, sharp, etc).

### Penetration Calculation

You might be curious why "actual PV" was relevant at all for me to distinguish as unique. Let's bring back our two-handed carbide weapon, but now let's give our character a Strength modifier of 10. Our readout will be <span class="stat pv"></span>`10/10` but our actual PV will be 12 and our effective PV will be 6. We'll see where this is an important distinction in just a moment, so let's go over how a penetration is calculated.

The algorithm for penetration works like the following:

-   Start with target's AV, our actual PV and maximum PV
-   Repeat the following 3 times:
    -   Roll a number -1 to 8 (exploding)
        -   This means if you roll the max, you roll again and add the result, repeating until you don't roll the max
    -   Calculate effective PV by setting it to the minimum between maximum PV and actual PV
    -   Add our roll to effective PV
    -   Check if effective PV exceeds AV, marking a success if so
-   If you got at least 1 success, add 1 penetration
-   If you got 3 successes, decrease actual PV by 2 and repeat this process

### Insights and Examples

There are a few insights to be gathered from this information:

-   A creature _always_ has a chance to penetrate, even if infinitesimally small
-   If you have 6 more displayed PV than the enemy does AV, you are guaranteed to penetrate once
    -   Remember, displayed is 4 more than actual
    -   Every 2 PV above this results in 1 extra guaranteed penetration
    -   A sharp ceremonial vibrokhopesh in Improved Aggressive Stance always penetrates at least 2 times
-   If your displayed PV is 6 greater than the enemies' AV, **more Strength reliably benefits you**

That last one deserves a bit of explanation since it may not be immediately obvious. If our displayed PV is 6 greater than the enemies' AV, that means our effective PV is 2 greater. The minimum roll (-1) still brings us over the enemies' AV, so it's guaranteed that we succeed all 3 times on the penetration rolls. If our actual PV is greater than our maximum PV by at least 2, when we reduce our actual PV by 2 and cap it; our effective PV _hasn't changed_ so we are guaranteed another penetration.

Let's run some numbers through the algorithm using our carbide weapon: actual PV 12, maximum PV 6, target AV 4 (example: girshling)

**Roll 1 - Actual PV: 12, Maximum PV 6, Target AV: 4**

-   Roll -1 to 8: result -1
-   Calculate effective PV: 6
-   Check penetration: 6 - 1 = 5 > 4
    -   Penetration success!
-   Repeat 3x; guaranteed to succeed each time
-   Reduce actual PV: 10

**Roll 2 - Actual PV: 10, Maximum PV 6, Target AV: 4**

-   Roll -1 to 8: result -1
-   Calculate effective PV: 6
-   Check penetration: 6 - 1 = 5 > 4
    -   Penetration success!
-   Repeat 3x; guaranteed to succeed each time
-   Reduce actual PV: 8

**Roll 3 - Actual PV: 8, Maximum PV 6, Target AV: 4**

-   Roll -1 to 8: result -1
-   Calculate effective PV: 6
-   Check penetration: 6 - 1 = 5 > 4
    -   Penetration success!
-   Repeat 3x; guaranteed to succeed each time
-   Reduce actual PV: 6

... And so on, I think you get the idea.

### Visualization

I've prepared for you a tool to help understand these mechanics a bit more. This tool allows you to see how many penetrations you would be expected to get with displayed PV and AV values. This is more interactive than the table on the wiki and will take into account the differences between the actual and displayed numbers so that you don't have to.

<combat-pen-tool></combat-pen-tool>

<!--
<details>
    <summary>How does the math work?</summary>
    <p>
    The calculation here is done iteratively by calculating how likely each individual penetration is to occur, leaving the expected value as the sum of all the probabilities. This is done until a probability threshold; an arbitrary value we choose past which the chance of success is too small for us to consider (otherwise the calculation would never end). Since this is an approximation anyways, we can be satisfied with this method. The threshold chosen is 0.001%, meaning anything less likely than a 1 in 100,000 chance is not considered. During this process, we're keeping track of each result as well as how likely it is that we get to this point at all.
    </p>
    <p>
    First, we calculate our effective PV [PV<sub>e</sub>] value in the same way as the game does. Next, we calculate the minimum value we would have to roll on our exploding dice roll in order to succeed (R). We then use that number to see how likely at least a single success [P<sub>1</sub>] is (meaning a penetration) and how likely three successes [P<sub>3</sub>] are (meaning a penetration <i>and</i> we continue). How likely it is for a single success is how likely we get exactly this many penetrations, while how likely it is we get three successes is how likely it is we get to the <i>next</i> penetration roll.
    </p>
    <p>
    In order to calculate how likely it is to get at least 1 or exactly 3 successes (those are the only two scenarios that matter), we need to be able to calculate how likely any given roll is to succeed [P<sub>s</sub>]. We can then calculate the probability of at least 1 success to be 1 minus the <i>chance to fail</i> [P<sub>f</sub>] cubed (P<sub>1</sub> = 1 - P<sub>f</sub><sup>3</sup>). We can calculate how likely it is to get three successes to be the probability that we succeed any given time cubed (P<sub>3</sub> = P<sub>s</sub><sup>3</sup>).
    </p>
    <p>
    Since the probability we fail any given time is simply the inverse of the probability we succeed (P<sub>f</sub> = 1 - P<sub>s</sub>), if we can calculate how likely it is to succeed at any given time we can then calculate everything else we need to know. We know the number that we need already (R), we can calculate that as AV + 1 - effective PV (R = 1 + AV - PV<sub>e</sub>). We then need to know how likely it is that we roll <i>at least</i> that number on an exploding d10 - 2.
    </p>
    <p>
    This is where the math can get pretty tough, as exploding number probability works a little weird. For your reference, you can see the probability of this roll <a href="https://anydice.com/program/3a93b">here</a> on AnyDice and we can work out a pattern to "cheat" computationally. Observe that there is a set of numbers all with the same probability: 0 to 6. This set encompasses 7 numbers. At the next number, the probability is increased by 10% of the probability of any number in our set, and the next number after is a flat 10% of any number in the set. This pattern continues as far as you choose to track it, and we can consider a range of 8 numbers to the pattern. -1 stands as an outlier before the pattern begins.
    </p>
    <p>
    If we think about it in another way, the probability that we roll a number within the end of the first range is 91%, within the end of the second range is 99.1%, within the end of the third range 99.91% (see a pattern?). We can calculate what individual % contribution a number has by determining what range it is in and dividing its place in the range - 1 by 10<sup>range#</sup>. We then add the probability contributed by the prior range to the probability contributed by its place in the range to get the final probability of <i>failure</i>. The inverse of this is of course the probability for success, and the "prior" range for the first range is just the probability of -1 which is 10%.
    </p>
    <p>
    For example, if we needed a roll of 17 in order to penetrate, we first calculate what range 17 falls in which we can find to be the 3rd range. Within the 3rd range, it is the 2nd number in the range. It being in the 3rd range means that it is 99.1% likely that the number falls in the first 2 ranges. The placement of 17 as 2nd means we calculate 1 / 10<sup>3</sup> = .1%, and when we add the two together it means that the number rolled is 99.2% likely to be below 17, meaning we have a 0.8% chance to roll 17 or more giving us a 0.8% chance to succeed a single time.
    </p>
    <p>
    If you want a mathematical formula, here it is:<br>
    <img src="$assetsDir/images/advanced/pofformulas.png"><br>
    <i>It's much easier to program than it is to find an equation for it</i>
    </p>
    <p>
    Once we calculate the probability for at least 1 success, we multiply that by the probability that we get to this stage in the first place and we have our probability for this iteration of penetrations. We get the probability that we get to this stage by using the probability that the <i>last</i> iteration resulted in 3 successes, and we continue to iterate until the probability of this number of penetrations falls below 0.001%. Once we're done, we then add up all the probabilities and that gives us our expected number of penetrations.
    </p>
</details> -->

## Move Speed

References

<span class="code-reference">XRL.World.GameObject.UseEnergy()</span>

<span class="code-reference">XRL.World.GetEnergyCostEvent.GetFor()</span>

---

Most of you have probably have been told or understood move speed to be the percent efficiency that you take move actions with. This is technically correct, but a bit misleading. Move speed works differently than all the other stats in that its benefit is not linear and works inverted. To set a baseline, we'll consider move speed as three different numbers: visual move speed, actual move speed and move speed modifier. Visual and actual move speed both start at 100 while your move speed modifier starts at 0. Whenever your move speed modifier changes (increases or decreases), your move speed modifier is _added_ to your visual move speed and _subtracted_ from your actual move speed. This means that if you have 150 visual move speed, your actual move speed is 50.

So why is this relevant? Well, when it comes time to calculate the percent efficiency at which you move, the following calculation is used:

P = 100 - ⌊100 / ((100 - A<sub>ms</sub>) / 100 + 1)⌋

_where A<sub>ms</sub> is your actual move speed_

When it comes time to determine how much energy is used for the move action, our efficiency (P) is used in the following equation:

E<sub>f</sub> = E<sub>0</sub> \* (100 - P) / 100

_where E<sub>f</sub> is the final energy cost and E<sub>0</sub> is the unmodified energy cost_

Move actions have an unmodified energy cost of 1,000, so if we plug in our numbers we get the following:

-   With 150 visual move speed: 660 energy
-   With 50 visual move speed: 2,000 energy

So what happened here? With our low move speed, it worked exactly as we expect: 50% move speed makes us move at half speed, everything takes twice as long. With our high move speed, however, we actually get less of a boost than we might expect. This tapers off into diminishing returns; for example we need another 50 added to our move speed modifier to reach a 500 energy cost, and then another 100 to get to 330. The minimum amount of energy a move can cost is 50 energy, which is achieved at 1,600 move speed. In other words, the effect move speed has on actual movement cost reduction is **not linear** like you might originally expect.

For example, you might have expected that 150 visual move speed means you move 1.5 times each turn, or 3 times every 2 turns but this is not the case. Instead, you move closer to 4 times every 3 turns, which is close but not quite as good.

In order to see the effects for yourself or if all of this went over your head, view this chart of visual move speed to energy per move:

<combat-move-speed-chart></combat-move-speed-chart>

### Insights and Applications

So what does this information tell us? Well, the main takeaway is that boosting movement speed past a certain point may just not be worth the tradeoff in comparison to other benefits. At about the 300 visual move speed mark, that's when the difference starts to really taper off. That just so happens to coincide with rank 10 Multiple Legs, and if you rapid advance Multiple Legs and have ironshank, then you sit at 280 visual move speed which is close enough to where a second rapid advancement probably isn't worth it if you have something else good to rapid advance.

## Quickness

References

<span class="code-reference">XRL.World.GameObject.UseEnergy()</span>

<span class="code-reference">XRL.World.GetEnergyCostEvent.GetFor()</span>

<span class="code-reference">XRL.World.Combat.PerformMeleeAttack()</span>

---

If you've ever played a character with higher than base quickness, you're bound to have noticed some strange things occurring with the wait timer and your cooldown timer. You also might have noticed something similar with effects that last a certain number of turns and been rather confused as to how this all works. As far as mechanics go, the "quickness" suite of mechanics working together are perhaps the most complicated.

You may have been told or understood quickness to be the percent efficiency that you perform _any_ action, and this is actually not quite accurate. This is basically how it manifests practically, but it is not what actually goes on. In order to understand all this mess properly we need to define some terms:

-   `Segment`: The smallest unit of "time" the game processes
-   `Tick`: A unit of "time" equal to 10 `segments`. The game tends to refer to this externally as a "turn"
-   `Energy`: The amount of "work" a creature can perform currently
-   `Action`: An interaction a creature has with the world that costs 0 or more `energy`
-   `Quickness`: The amount of `energy` a creature gains per `segment`
-   `Round`: The completion of an `action` that brings a creature below 1,000 `energy`

### Mechanics

The way it works can be described as the following. The game begins to process a `segment`. When this occurs, a queue of creatures that can act is referenced one-by-one. For the current creature in the queue, they gain an amount of `energy` equal to their `quickness` score. If that creatures' `energy` is still below 1,000, the `segment` moves on to the next creature. If that creatures' `energy` is _above_ 1,000, that creature may now perform `actions`. Every `action` has an `energy` cost of at least 0 and as long as it costs at least 10 energy, it will cost +/- 10% for a bit of variance (this ensures that creatures don't _always_ act in the same order). A creature continues to perform `actions` until they perform an `action` that lowers their `energy` to below 1,000. When this occurs, a `round` occurs for that creature. Basically everything that affects the creature for a duration has its duration reduced when a `round` occurs, both positive and negative effects.

When the game has processed 10 `segments`, a `tick` occurs. At this time, most things that are said to last a certain number of "turns" have their timer decreased. I say "most things" because sometimes "turn" is used where "round" is meant. In fact, really the only thing that happens during a `tick` is that cooldown timers specifically have their duration reduced. The game continues to process `segments`, and any `energy` left over is never removed, so will always carry over to the next `segment` or `tick`. This is how you end up getting more `actions` over time with high `quickness`.

For example, if you have 110 `quickness`, over the course of a `tick` you will gain 1,100 `energy`. A move `action` with 100 move speed costs 1,000 `energy`, so during `segment` 10 you reach 1,100 `energy` to bring you over 1,000 for the first time and then use 1,000 `energy` for your move `action`. This will leave you with 100 `energy`, so the next `tick` you start with 100 `energy` instead of 0 and actually perform your next `action` in `segment` 9 instead of `segment` 10.

> Again, note that there is a random +/- 10% variance in `action` cost. Over time, this will even itself out so is ignored here for simplicity.

### Insights and Consequences

So in other words, quickness doesn't improve the efficiency of your `actions` it just gives you more `energy` to work with. In the majority of cases this is the same thing in practicality, but not all cases. You see, there _are_ things that do reduce the `energy` that certain `actions` cost; in fact we just looked at one in move speed. Every skill that mentions `action` cost being reduced do indeed lower the `energy` that those `actions` cost: Empty the Clips, Fastest Gun in the Rust, and Short Blade Expertise. Cybernetics like Rapid release finger flexors and mutations like Two-Headed and Telepathy also reduce certain `action` costs.

Why would this information be relevant, you might ask? Well, it's the interaction between `rounds` and `actions`. You see, a `round` only occurs when an `action` brings the amount of `energy` a creature has below 1,000. This means if you are able to reduce the cost of your `action` below the `energy` you gain from quickness, you can potentially get multiple `actions` within a single `round`, extending the duration of beneficial effects. I'm sure you can be more creative than me with coming up with some synergies there.

This interaction between `rounds` and `ticks` is what causes the discrepancy between your cooldowns at (for example) the number of turns you have to pass in order for them to come off cooldown. Passing your turn is simply a 1,000 `energy` cost `action` that does nothing, so with high quickness you do more of these over time than `ticks` occur.

Additionally, your placement in the queue as the player also causes the observed interaction that when you enter a zone for the first time, you can leave it on the first turn and none of the other creatures will follow after you. However, if you walk back in they will all immediately take their turn. This is because when you load up the zone, all the creatures will be created for the first time and have their `energy` defaulted to 0. You'll gain `energy` alongside them, but go first because they will be added to the queue after you. When you re-enter the zone, the creatures will have the `energy` that they had gained before you left, so they'll likely act before you do.
