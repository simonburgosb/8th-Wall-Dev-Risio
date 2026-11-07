import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'abrir-link',
  schema: {
    link: ecs.string,
  },
  stateMachine: ({eid, defineState, schemaAttribute}) => {
    defineState('activo')
      .initial()
      .listen(eid, ecs.input.SCREEN_TOUCH_END, ({data}) => {
        if (data.target === data.endTarget) {
          const {link} = schemaAttribute.get(eid)
          window.open(link, '_blank', 'noopener,noreferrer')
        }
      })
  },
})
