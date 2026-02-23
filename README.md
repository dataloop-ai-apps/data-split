# Data Split Node

The **Data Split** node is a powerful data processing tool that allows you to divide your data into multiple groups at runtime.
Use this node to segment your data into different subsets, to simplify the process, etc.

<img src="assets/pipeline-example.png">

## Node Inputs and Outputs

- Inputs: The Data Split node accepts a single input.
- Outputs: It produces multiple outputs, each corresponding to a different group.

## How It works

When an item flows through the node, it is randomly allocated to one of the groups based on the distribution settings defined in the configuration panel.

For each item that is assigned to a group:

- It proceeds through the designated group output, continuing the specific path set for that group.
- [Optional] A tag will be added to the item's metadata, indicated `metadata.system.tags.<group assigned>: true`.

### Example of Item Metadata in Group 1

```json
{
  "system": {
    "tags": {
      "group_1": true
    }
  }
} 
```

## Node Configuration

<img src="assets/node-config.png" height="480">

**Configuration Options**

- **Node Name:** The name displayed on the canvas.
- **Groups and Distribution:** Define the number of groups (minimum 2, maximum 5) and their distribution ratios.
- **Distribute Equally:** Enable this option to ensure equal distribution across all groups.
- **Item Tags**: By default, this option allows you to add metadata tag to items once they are assigned to a group. The
  tag will be the group name and will be added to the item's metadata [tag](#example-of-item-metadata-in-group-1).


## Start Using the Data Split Node

1. Go to the `Pipelines` page and click `Create pipeline`. You can use either a template or create one from scratch.
2. Build a custom work flow that requires splitting the data into multiple groups at runtime.
3. Define the subsets and their distribution in the data split node configuration panel.
4. Start the Pipeline.

For the detailed information, refer to the [Create and Manage Pipelines](creating-pipelines) article.


## Contributions, Bugs and Issues - How to Contribute

We welcome anyone to help us improve this app.  
[Here's](CONTRIBUTING.md) a detailed instructions to help you open a bug or ask for a feature request.