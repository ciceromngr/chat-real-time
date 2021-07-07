import React, {useState, useEffect, useRef} from 'react';
import EmojiPicker from 'emoji-picker-react'
import "./styled.scss";

import MessageItem from '../../components/messageItem';

import Search from '@material-ui/icons/Search';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import Close from '@material-ui/icons/Close';
import Send from '@material-ui/icons/Send';

export default ({user} : any) => {

    const body: any = useRef();

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState("");
    const [list, setList] = useState([
        {author: 123, body: "bla bla bla"},
        {author: 12343,body: "bla bla bla ?"},
        {author: 123,body: "bla bla :)"},
        {author: 123, body: "bla bla bla"},
        {author: 12343,body: "bla bla bla ?"},
        {author: 123,body: "bla bla :)"},
        {author: 123, body: "bla bla bla"},
        {author: 12343,body: "bla bla bla ?"},
        {author: 123,body: "bla bla :)"},
        {author: 123, body: "bla bla bla"},
        {author: 12343,body: "bla bla bla ?"},
        {author: 123,body: "bla bla :)"},
        {author: 123, body: "bla bla bla"},
        {author: 12343,body: "bla bla bla ?"},
        {author: 123,body: "bla bla :)"},
        {author: 123, body: "bla bla bla"},
        {author: 12343,body: "bla bla bla ?"},
        {author: 123,body: "bla bla :)"},
        {author: 123, body: "bla bla bla"},
        {author: 12343,body: "bla bla bla ?"},
        {author: 123,body: "bla bla :)"},
        {author: 123, body: "bla bla bla"},
        {author: 12343,body: "bla bla bla ?"},
        {author: 123,body: "bla bla :)"},
        {author: 123, body: "bla bla bla"}
    ]);

    const handleEmojiClick = (e: any, emojiObject: any) => {
        setText( text + emojiObject.emoji);
    }

    const handleSendCLick = () => {

    }

    useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }
    }, [list])

    return (
        <div className="chatWindow">
            <div className="chatWindow-header">

                <div className="chatWindow-headerinfo">
                    <img className="chatWindow-avatar" src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
                    <div className="chatWindow-name">Fulano de Tal1</div>
                </div>


                <div className="chatWindow-headerbuttons">

                    <div className="chatWindow-btn">
                        <Search style={{color: "#919191"}}/>
                    </div>
                    <div className="chatWindow-btn">
                        <AttachFile style={{color: "#919191"}}/>
                    </div>
                    <div className="chatWindow-btn">
                        <MoreVert style={{color: "#919191"}}/>
                    </div>

                </div>
            </div>
            
            <div ref={body} className="chatWindow-body">
                {list.map((item, key)=> (
                    <MessageItem 
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
            </div>

            {/* -------------------------------------------EMOJI---------------------------------------------------- */}

            <div  
                className="ChatWindow-emojiarea" 
                style={{height: emojiOpen? '300px': '0px'}}
            >
                <EmojiPicker 
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>

            {/* ----------------------------------------------------------------------------------------------------- */}
            
            <div className="chatWindow-footer">

                <div className="chatWindow-pre">

                    <div 
                        className="chatWindow-btn"
                        onClick={() => setEmojiOpen(false)}
                        style={{width: emojiOpen? 40 : 0}}
                    >
                        <Close style={{color: "#919191"}}/>
                    </div> 

                    <div 
                        className="chatWindow-btn"
                        onClick={() => setEmojiOpen(true)}
                    >
                        <InsertEmoticon style={{color: emojiOpen ? "#009688": "#919191"}}/>
                    </div> 

                </div>

                <div className="chatWindow-inputarea">

                    <input 
                        type="text" 
                        className="chatWindow-input"
                        placeholder="Digite uma mensagem"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                </div>

                <div className="chatWindow-pos">

                    <div className="chatWindow-btn">
                        <Send 
                            style={{color: "#919191"}}
                            onClick={handleSendCLick}
                        />
                    </div> 

                </div>

            </div>
        </div>
    )
}