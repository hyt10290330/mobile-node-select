## mobile-node-select

Mobile department (node tree) selection component.

> **Note:** Examples are as follows:

```html
<node-select
  :data="data"
  :isShow="isShow"
  @close="close"
  @selectDepartment="handleSelectDepartment"
  textField="name"
></node-select>
```

```js
{
  data() {
    return {
      isShow: false,
      data: [
        {
          id: 1,
          instituteId: 598,
          userId: 1,
          name: '中国',
          parentId: 0,
          nodeSize: 2,
        },
        {
          id: 16,
          instituteId: 598,
          userId: 1,
          name: '日本',
          parentId: 0,
          nodeSize: 3,
        },
        {
          id: 17,
          instituteId: 598,
          userId: 1,
          name: '11',
          parentId: 1,
          nodeSize: 0,
        },
        {
          id: 19,
          instituteId: 598,
          userId: 1,
          name: '111',
          parentId: 1,
          nodeSize: 0,
        },
        {
          id: 18,
          instituteId: 598,
          userId: 1,
          name: '七龙珠',
          parentId: 16,
          nodeSize: 0,
        },
        {
          id: 20,
          instituteId: 598,
          userId: 1,
          name: '海贼王',
          parentId: 16,
          nodeSize: 0,
        },
        {
          id: 50,
          instituteId: 598,
          userId: 1,
          name: '火影忍者',
          parentId: 16,
          nodeSize: 0,
        },
      ],
      title: '',
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
    open() {
      this.isShow = true
    },
    handleClick() {
      this.open()
    },
    handleSelectDepartment(ancestors, currentNode) {
      this.close()
      const nodes = [...ancestors, currentNode]
      this.title = nodes.map(node => `${node.level}Level ${node.name}`).join('/')
    },
  },
}
```

## Installation

`npm install mobile-node-select`

## API Documentation
