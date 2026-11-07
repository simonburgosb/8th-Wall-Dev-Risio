import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'SeguimientoTarjeta',
  schema: {
    contenido: ecs.eid,
  },
  stateMachine: ({world, eid, defineState, schemaAttribute}) => {
    const setActive = (active: boolean) => {
      const content = world.getEntity(schemaAttribute.get(eid).contenido)
      if (active && content.isDisabled()) content.enable()
      if (!active && !content.isDisabled()) content.disable()
    }
    const ownTarget = (data: unknown) =>
      data && typeof data === 'object' && 'name' in data &&
      data.name === ecs.ImageTarget.get(world, eid).name
    const onSeen = ({data}: {data: unknown}) => {
      if (ownTarget(data)) setActive(true)
    }

    defineState('seguimiento')
      .initial()
      .onEnter(() => setActive(false))
      .listen(world.events.globalId, 'reality.imagefound', onSeen)
      .listen(world.events.globalId, 'reality.imageupdated', onSeen)
      .listen(world.events.globalId, 'reality.imagelost', ({data}) => {
        if (ownTarget(data)) setActive(false)
      })
      .listen(world.events.globalId, 'xr.stop', () => setActive(false))
  },
})
