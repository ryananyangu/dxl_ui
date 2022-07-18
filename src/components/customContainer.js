import styled from "styled-components"

export function CustomContainer({children, controls, title}) {
    console.log(title)
    return <StyledCustomContainer>
        <div className="title">
            {title}
        </div>
        <div className="main-content">
            {children}
        </div>
        <div className="controls">
            {controls}
        </div>
    </StyledCustomContainer>
}

const StyledCustomContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    width: 100%;
    .title {
        margin-bottom: 1em;
        font-size: 1.25em;
        font-weight: 500;
    }
    .main-content {
        flex-grow: 1;
        width: 100%;
    }
    .controls {
        margin-top: 1em;
        display: flex;
        justify-content: flex-end;
        button {
            background-color: #000000;
            color: #ffffff;
            border: 1px solid #000000;
            padding: 0.5em 1em;
            margin: 0.25em 1em;
            &:hover {
                background-color: #444444;
            }
        }
    }
`