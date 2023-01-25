[![NPM](https://img.shields.io/npm/v/sp-modal.svg)](https://www.npmjs.com/package/sp-modal)
![npm](https://img.shields.io/npm/dm/sp-modal)

# SpModal

A modal component for React applications. The modal can be opened and closed by controlling the `visible` prop, and can have a custom title and body content.

**Contains:**
- Children
- Title
- Close button

## Installation
To install:
```
npm install sp-modal
```

## Usage

To use the component, import it into your React code and pass in the necessary props:

```js
import SpModal from 'sp-modal';

function MyComponent() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <div>
            <button onClick={() => setModalVisible(true)}>Open Modal</button>
            <SpModal
                visible={modalVisible}
                closeHandler={() => setModalVisible(false)}
                title="Modal Title"
            >
                <p>Modal Body</p>
            </SpModal>
        </div>
    );
}


```
The visible prop controls whether the modal is open or closed, and the closeHandler prop is a function that is called when the modal is closed. The title prop is an optional prop that can be used to set a custom title for the modal, and the modal's body content is passed in as the component's children.

**3 possibilities to close the modal:**
- modal close button
- escape keyboard key
- when you click outside the modal

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
