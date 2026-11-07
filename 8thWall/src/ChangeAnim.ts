import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'ChangeAnim',
  schema: {
    animIdle: ecs.string,
    animSalute: ecs.string,
  },
  schemaDefaults: {
    animIdle: '01-Idle',
    animSalute: '02-Salute',
  },
  stateMachine: ({world, eid, defineState, schemaAttribute}) => {
    const play = (animationClip: string, loop: boolean) => {
      ecs.GltfModel.mutate(world, eid, (model) => {
        model.animationClip = animationClip
        model.loop = loop
        model.paused = false
        model.time = 0
        return false
      })
    }

    defineState('idle')
      .initial()
      .onEnter(() => play(schemaAttribute.get(eid).animIdle, true))
      .onEvent(ecs.input.SCREEN_TOUCH_END, 'salute', {
        target: eid,
        where: ({data}) => data.target === eid && data.endTarget === eid,
      })

    defineState('salute')
      .onEnter(() => play(schemaAttribute.get(eid).animSalute, false))
      .onEvent(ecs.events.GLTF_ANIMATION_FINISHED, 'idle', {
        target: eid,
        where: ({data}) => data.name === schemaAttribute.get(eid).animSalute,
      })
  },
})
