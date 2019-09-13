## mobile-node-select

The vue-based mobile department (node tree) selection component.

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

## Props Documentation

| field     | Explain                                                 | Type    | Default value | Optional value |
| --------- | ------------------------------------------------------- | ------- | ------------- | -------------- |
| data      | The data source that the driver component is running on | Array   | []            | none           |
| isShow    | Whether to display the popup layer dropdown component   | Boolean | false         | none           |
| textField | The node name field to display in the array             | string  | 'title'       | none           |

## Events Documentation

| field                  | Explain                                                             | Parameters callback                       |
| ---------------------- | ------------------------------------------------------------------- | ----------------------------------------- |
| close                  | Click on the event that is triggered when the popup layer is closed | none                                      |
| handleSelectDepartment | Events fired when the lowest level component is selected            | ancestors: Array<Node>, currentNode: Node |
