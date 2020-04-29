import React, {Component} from 'react';
import './ApiDetail.css';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    OKIcon,
    OKShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    VKIcon,
    VKShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Icon, Input} from "semantic-ui-react";
import {Table} from "semantic-ui-react/dist/commonjs/collections/Table";

class ApiDetailSharePopup extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            text: '',
            copied: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({loading: false})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onCopy = () => {
        const {text} = this.state;
        this.setState({copied: true, });
        const timer = setTimeout(() => this.setState({copied: false}), 3000);
        return () => clearTimeout(timer);
    };


    render() {

        const {description, info, image, name, host, category, link, updated, operations, url, dealer} = this.props;
        const {loading, text, copied} = this.state;
        const relatedAccount = 'yourapi_ru';
        const descriptionText = description.trim().replace(/^\s+|\s+$/g, '');
        const title4share = '❗' + name + ' ❗\n\n';
        const url4share = 'https://yourapi.ru' + url + '\n';
        const text4share = descriptionText + '\n\nhttps://yourapi.ru' + url + '\n';
        const applicationName = 'YourAPI';
        const imageUrl = host + "/api-data/image/" + image + "/150/150";
        console.log(imageUrl)
        const styles = {
            shareElement: {
                paddingRight: 12
            }
        };

        return (
            <div className='api-detail-share-popup'>
                <div className='api-detail-share-popup-input-element'>
                    <Input className="form-input api-detail-share-popup-input-element-copy"
                           placeholder={url4share}
                           id={text}
                           value={url4share}
                           fluid
                           type='text'>
                    </Input>
                    <CopyToClipboard text={url4share} onCopy={this.onCopy}>
                        { copied ? <Icon className='api-detail-share-popup-input-copy fadeInLeft animated3' name='paste'/>  : <Icon className='api-detail-share-popup-input-copy' name='copy outline' link/> }
                    </CopyToClipboard>
                </div>
                <div className='api-detail-share-popup-element'>
                    <TelegramShareButton title={title4share + descriptionText} url={url4share}> <TelegramIcon size={32}
                                                                                                              round={true}/></TelegramShareButton>
                    <div style={styles.shareElement}/>
                    <VKShareButton title={title4share} image={imageUrl} noParse={false} url={url4share}> <VKIcon size={32}
                                                                                                                 round={true}/></VKShareButton>
                    <div style={styles.shareElement}/>
                    <TwitterShareButton title={title4share + text4share} via={relatedAccount}
                                        hashtags={['yourapi', 'botmasterzzz', 'api']} related={[relatedAccount]}
                                        url={url4share}> <TwitterIcon size={32} round={true}/></TwitterShareButton>
                    <div style={styles.shareElement}/>
                    <FacebookShareButton quote={title4share + text4share} hashtag={'#yourapi'} url={url4share}>
                        <FacebookIcon size={32} round={true}/></FacebookShareButton>

                    {/*<div style={styles.shareElement}/>*/}
                    {/*<InstapaperShareButton title={title4share} description={descriptionText} url={url4share}>*/}
                    {/*<InstapaperIcon size={32} round={true} iconFillColor={'white'}/></InstapaperShareButton>*/}

                    {/*<div style={styles.shareElement}/>*/}
                    {/*<LineShareButton title={title4share + text4share} url={url4share}> <LineIcon size={32}*/}
                    {/*round={true}/></LineShareButton>*/}
                    <div style={styles.shareElement}/>
                    <LinkedinShareButton title={title4share} summary={descriptionText} source={applicationName}
                                         url={url4share}> <LinkedinIcon size={32} round={true}/></LinkedinShareButton>
                    {/*<div style={styles.shareElement}/>*/}
                    {/*<LivejournalShareButton title={title4share} url={url4share}> <LivejournalIcon size={32}*/}
                    {/*round={true}/></LivejournalShareButton>*/}
                    {/*<div style={styles.shareElement}/>*/}
                    {/*<MailruShareButton title={title4share} description={descriptionText} imageUrl={imageUrl}*/}
                    {/*url={url4share}> <MailruIcon size={32} round={true}/></MailruShareButton>*/}
                    <div style={styles.shareElement}/>
                    <OKShareButton title={title4share} description={descriptionText} image={imageUrl} url={url4share}>
                        <OKIcon size={32} round={true}/></OKShareButton>
                    {/*<div style={styles.shareElement}/>*/}
                    {/*<PinterestShareButton description={title4share + descriptionText} media={imageUrl} url={url4share}>*/}
                    {/*<PinterestIcon size={32} round={true}/></PinterestShareButton>*/}
                    {/*<div style={styles.shareElement}/>*/}
                    {/*<RedditShareButton title={title4share} url={url4share}> <RedditIcon size={32}*/}
                    {/*round={true}/></RedditShareButton>*/}

                    {/*<div style={styles.shareElement}/>*/}
                    {/*<ViberShareButton title={title4share} separator={'\n'} url={url4share}> <ViberIcon size={32}*/}
                    {/*round={true}/></ViberShareButton>*/}

                    <div style={styles.shareElement}/>
                    <WhatsappShareButton title={title4share} separator={'\n'} url={url4share}> <WhatsappIcon size={32}
                                                                                                             round={true}/></WhatsappShareButton>
                    <div style={styles.shareElement}/>
                    <EmailShareButton subject={title4share} body={text4share} url={url4share}> <EmailIcon size={32}
                                                                                                          round={true}/></EmailShareButton>
                </div>

            </div>
        )
    }
}

export default ApiDetailSharePopup;