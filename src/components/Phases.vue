<template>
  <v-row>
    <v-col offset=9>
      <slot />
    </v-col>
  </v-row>
  <v-container>
    <v-row>
      <v-col>
        <v-tabs show-arrows center-active v-model="selectedPhase">
          <v-tab v-for="phase of phases" :key="phase">
            {{ phase }} Phase
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="phases[selectedPhase] === 'hero'">
        <v-expansion-panels variant="popout" multiple v-model="panels">
          <v-expansion-panel value="heroicActions">
            <v-expansion-panel-title>Heroic Actions</v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="mb-5">
                <h4 class="mb-2">Heroic Leadership</h4>
                <p>
                  Pick 1 friendly HERO and roll a dice. Add 2 to the roll if your general has been slain. On a 4+, you receive 1 command point that can only be spent during that turn to allow that HERO to issue a command.
                </p>
              </div>
              <div class="mb-5">
                <h4 class="mb-2">Heroic Willpower</h4>
                <p>
                  Pick 1 friendly HERO that is not a WIZARD. If it is the enemy hero phase, that HERO can attempt to unbind 1 spell in that phase as if they were a WIZARD. If it is your hero phase, that HERO can attempt to dispel 1 endless spell in that phase as if they were a WIZARD (you can still only attempt to unbind or dispel the same spell or endless spell once in the same phase).
                </p>
              </div>
              <div class="mb-5">
                <h4 class="mb-2">Their Finest Hour</h4>
                <p>
                  Pick 1 friendly HERO. Add 1 to wound rolls for attacks made by that HERO until the end of that turn, and add 1 to save rolls for attacks that target that HERO until the end of that turn. You cannot carry out this heroic action with the same HERO more than once in the same battle.
                </p>
              </div>
              <div class="mb-5">
                <h4 class="mb-2">Heroic Recovery</h4>
                <p>
                Pick 1 friendly HERO that is more than 3" from all enemy units and make a heroic recovery roll by rolling 2D6. If the roll is less than or equal to that HERO’s Bravery characteristic, you can heal up to D3 wounds allocated to that HERO.
                </p>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel value="Command Abilities">
            <v-expansion-panel-title>Command Abilities</v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="mb-5">
                <h4>Rally</h4>
                <p>
                  You can use this command ability at the start of the hero phase. The unit that receives the command must be more than 3" from all enemy units. Roll 1 dice for each slain model from that unit. For each 6, you can return 1 slain model to that unit.
                </p>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>  
      </v-col>
      <v-col v-if="phases[selectedPhase] === 'movement'">
        <v-card width="100%">
          <v-card-title>
            Battle Traits
          </v-card-title>
          <v-card-text>
            <div class="mb-5">
              <h3 class="mb-2">At the Double</h3>
              <p>You can use this command ability after you declare that a friendly unit will run. That unit must receive the command. The run roll is not made for that unit. Instead, 6" is added to that unit’s Move characteristic in that phase. The unit is still considered to have run.</p>
            </div>
            <div class="mb-5">
              <h3 class="mb-2">Redeploy</h3>
              <p>You can use this command ability in the enemy movement phase after an enemy unit finishes a normal move, run or retreat. The unit that receives the command must be within 9" of that enemy unit and more than 3" from all enemy units. You can make a D6" move with the unit that receives the command, but it must finish the move more than 3" from all enemy units and cannot shoot later in the turn.</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="phases[selectedPhase] === 'shooting'">
        <v-card width="100%">
          <v-card-title>
            Battle Traits
          </v-card-title>
          <v-card-text>
            Nothing here..
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="phases[selectedPhase] === 'charge'">
        <v-card width="100%">
          <v-card-title>
            Battle Traits
          </v-card-title>
          <v-card-text>
            <div class="mb-5">
              <h3 class="mb-2">Forward to Victory</h3>
              <p>
                You can use this command ability after you make a charge roll for a friendly unit. That unit must receive the command. You can re-roll the charge roll for that unit.
              </p>
            </div>
            <div class="mb-5">
              <h3 class="mb-2">Unleash Hell</h3>
              <p>
                You can use this command ability after an enemy unit finishes a charge move. The unit that receives the command must be within 6" of that enemy unit and more than 3" from all other enemy units. Models in the unit that receives the command that are within 6" of the target unit can shoot in that phase, but when they do so, you must subtract 1 from hit rolls for their attacks and they can only target the unit that made the charge move.
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="phases[selectedPhase] === 'combat'">
        <v-card width="100%">
          <v-card-title>
            Battle Traits
          </v-card-title>
          <v-card-text>
            Nothing here..
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="phases[selectedPhase] === 'battleshock'">
        <v-card width="100%">
          <v-card-title>
            Battle Traits
          </v-card-title>
          <v-card-text>
            <div>
              <h3 class="mb-2">Inspiring Presence</h3>
              <p>
                You can use this command ability at the start of the battleshock phase. The unit that receives the command does not have to take battleshock tests in that phase.
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PhasesView',

  props: {
    general: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      selectedPhase: 'hero',
      panels: ['heroicActions', 'commandAbilities'],
      phases: [
        'hero',
        'movement',
        'shooting',
        'charge',
        'combat',
        'battleshock',
      ],
    };
  },
}
</script>
