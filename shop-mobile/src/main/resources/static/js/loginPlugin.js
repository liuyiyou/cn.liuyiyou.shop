(function ($) {
    var time = 60;
    var code = false;
    var isweixin = '确定';
    var sencode = '';
    var isRender = 0;
    var loginOptions = {};
    var cacheDom = {};
    function initDom(_wrapper) {
        cacheDom.$loginBackBtn = _wrapper.find('.loginBackBtn');
    }
    function init(options, obj) {
        initLogin(options, obj);
        initLoginPopup(options);
        return {
            popupHide:popupHide
        }
    }
    function initLogin(options,obj) {
        if (options.showLogin===true) {
            var trackId = common.getSessionStorage("trackId");
            if( trackId  && trackId!="null"){
                gotoPageUrl("/index.html");
            }
            if (common.isWeixin()&&options.showPopup!== 'show'){
                $('.iba-nav-title').html('绑定手机');
            }
            if(isRender===0){
                var _wrapper = renderLogin(obj,options);
                initDom(_wrapper);
                initEvent(obj);
                isRender = 1;
            }else {
                readyLogin(obj);
            }
        }
    }
    function initLoginPopup(options) {
        if(options.showPopup === 'show'){
            if(options.popupStyle){
                $('.loginWrapper').addClass(options.popupStyle);
            }else{
                $('.loginWrapper').addClass('showPopup');
            }
            popupShow(options)
        }else {
            $('.loginWrapper').removeClass('showPopup');
        }
    }
    function renderLogin(obj,options) {
        var preSubmitHtml='';
        if(common.isWeixin()===true && options.showPopup ===""){
            preSubmitHtml= '绑定手机'
        }
        else{
            preSubmitHtml= '确定'
        }

        var _headerHtml = '';
        if(options.popupStyle=='default' && options.showPopup=='show'){
            _headerHtml = '<div class="head"><div class="nav"><div class="ib-nav-left-wrapper"><div class="loginBackBtn"></div></div><div class="iba-nav-title">登录注册</div><div class="ib-nav-right-wrapper"></div></div></div>';
        }
        var _html = '<div class="loginWrapper show">' + _headerHtml+
            '    <div class="loginContainer">' +
            '            <div class="logining">' +
            '                <div class="popupTitle">' +
            '                    您需要先登录' +
            '                </div>' +
            '                <div class="popupNotice">' +
            '                    未注册的手机号，将自动创建洋老板账号' +
            '                </div>' +
            '                <div class="account">' +
            '                    <span></span>' +
            '                    <input class="accountPhone" type="phone" value=""  id = "account"  autocomplete="off"  onkeyup="this.value=this.value.replace(/\\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\\D/g,\'\')"  maxlength=11 placeholder="请输入手机号码">' +
            '                    <input class="accountPassword" type="text" value="" autocomplete="off"    id = "accountPassword" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\\D/g,\'\')"  maxlength=11 placeholder="请输入手机号码">' +
            '                </div>' +
            '                <div class="code">' +
            '                    <span></span>' +
                                  '<input type="password" style="display:none">'+
            '                    <input class="" type="text" value=""  id = "code" autocomplete="off"  onkeyup="this.value=this.value.replace(/\\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\\D/g,\'\')" maxlength=6 placeholder="请输入验证码">' +
            '                    <div class="preGetCode">获取验证码</div>' +
            '                    <div class="getCode">获取验证码</div>' +
            '                </div>' +
            '                <div class="password">' +
            '                    <span></span>' +
            '                    <input class="" type="password" value=""  id = "password"  maxlength=20 placeholder="请输入密码">' +
            '                    <div class="passwordSecret secret"></div>' +
            '                    <div class="retrievePassword">找回密码</div>' +
            '                </div>' +
            '                <div class="preSubmit">'+preSubmitHtml+'</div>' +
            '                <div class="submit">'+preSubmitHtml+'</div>' +
            '                <div class="passwordSubmit">'+preSubmitHtml+'</div>' +
            '                <div class="agree">' +
            '                     <div class="voiceCode">' +
            '                            <span>接收不到短信，接听<span id="getVoiceCode">语音验证码</span></span>' +
            '                     </div>' +
            '                    <div class="passwordLogin">密码登录</div>' +
            '                    <div class="register">新账号注册</div>' +
            '                    <div class="codeLogin">验证码登录</div>' +
            '                </div>' +
            '            </div>' +
            '            <div class="closePopup"></div>' +
            '            <div class="agreement iphoneX">' +
            '                <div class="agreeCheck checked"></div>' +
            '                <span>已阅读并同意<a href="javascript:;">《洋老板用户服务协议》</a></span>' +
            '             </div>' +
            ' <div class="agreementTitle">洋老板用户服务协议</div>\n' +
            '            <div class="agreeContent">\n' +
            '                <div class="agreementTips">服务使用方：洋老板商城用户</div>\n' +
            '                <div class="agreementTips">服务提供方：洋老板商城用户</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    本协议是洋老板商城用户（以下简称“您”）与洋老板商城经营者广州海货电子商务有限公司之间就洋老板商城平台服务相关事宜所订立的契约。\n' +
            '                </div>\n' +
            '                <div class="agreementTips">定义：</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    （一）洋老板商城，指广州海货电子商务有限公司基于互联网向用户提供服务的各种形态，包括海货平台网站、客户端等，以及未来技术发展出现的新的服务形态。\n' +
            '                </div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    （二）洋老板商城用户：指按照洋老板商城注册页面的提示填写信息，阅读并同意本协议，完成全部注册程序的店铺经营者（卖家）和购买人（买家）。根据交易行为中的角色确定是卖家还是买家，进而适用本协议中对应的条款内容。\n' +
            '                </div>\n' +
            '                <div class="agreementTips">第一部分 声明与承诺</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    1、请您确认，您在注册成为洋老板商城用户时，您已充分阅读、理解并接受本协议的全部内容，一旦您使用本服务，即表示您同意遵循本协议的所有约定。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。\n' +
            '                </div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    2、您同意洋老板商城有权随时对本协议内容进行单方面的变更，并以在洋老板商城网站公告的方式予以公布，经修订的协议在洋老板商城公告后立即生效，无需另行单独通知您；若您在本协议内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容而使用本服务；若您不同意修改后的协议内容，您应停止使用本服务。\n' +
            '                </div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    3、您声明，在您注册成为洋老板商城用户时，您是具有法律规定的完全民事权利能力和民事行为能力，能够独立承担民事责任的自然人、法人或其他组织；本协议内容不受您所属国家或地区的排斥。不具备前述条件的，您应立即终止注册或停止使用本服务。建议您在使用洋老板商城网站前阅读本协议及网站的公告。如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。\n' +
            '                </div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    4、您应对您账户项下的所有行为结果（包括但不限于在线签署各类协议、发布信息、销售/购买商品及服务及披露信息等）负责。\n' +
            '                </div>\n' +
            '                <div class="agreementTips">第二部分 用户和购买</div>\n' +
            '                <div class="agreementTips">(一) 用户信息</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、您应自行诚信向<b>洋老板商城</b>提供注册资料，承诺您提供的注册资料真实、准确、完整、合法有效，如果您提供的注册资料不合法、不真实、不准确、不完整的，您需承担因此引起的相应责任及后果，并且<b>洋老板商城</b>有权终止您使用<b>洋老板商城</b>各项服务。如有证据证明或<b>洋老板商城</b>有理由相信您存在不当注册账户的情形，<b>洋老板商城</b>可采取冻结或关闭账户、取消订单、拒绝提供服务等措施，如给<b>洋老板商城</b>及相关方造成损失的，您还应承担赔偿责任。</p>\n' +
            '                    <p>2、您在本站进行浏览、下单购物等活动时，涉及您的真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，<b>洋老板商城</b>将予以严格保密，除非得到您的授权或法律另有规定，<b>洋老板商城</b>不会向外界披露您的隐私信息。\n' +
            '                    </p>\n' +
            '                    <p>3、您注册成功后，将产生用户名和密码等账户信息，您可以根据<b>洋老板商城</b>规定修改密码。您应谨慎合理地保存、使用用户名和密码。您若发现其他人存在非法使用您的账号或存在安全漏洞的情况，请立即通知<b>洋老板商城</b>并向公安机关报案。您理解<b>洋老板商城</b>对您的任何请求采取行动均需要合理时间，且<b>洋老板商城</b>应您请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除<b>洋老板商城</b>存在法定过错外，<b>洋老板商城</b>不承担责任。如因您的原因未妥善保管账户而遭受账户被盗，或因您遭受黑客攻击、诈骗等行为导致的损失及后果，您不得以此作为取消交易或拒绝付款的理由，<b>洋老板商城</b>不承担任何责任，您应通过司法、行政等救济途径向侵权行为人追偿。</p>\n' +
            '                    <p>4、您同意，<b>洋老板商城</b>拥有通过邮件、短信电话等形式，向在<b>洋老板商城</b>注册、购物用户以及收货人发送订单信息、促销活动等告知信息的权利。如您不希望接收上述信息，可退订。</p>\n' +
            '                    <p>5、您不得将<b>洋老板商城</b>注册获得的账户借给他人使用，否则您应承担由此产生的全部责任，并与实际使用人承担连带责任。</p>\n' +
            '                    <p>6、您应当及时更新您提供的信息，<b>洋老板商城</b>有权在必要时对您的注册信息、用户名、密码等信息进行检查核实，登录进入您的注册账户，进行证据保全，包括但不限于公证、见证等。您应当配合提供最新、真实、完整、有效的信息。您提供的信息存在明显不实或信息无效的，则无法使用<b>洋老板商城</b>网站或在使用过程中受到限制，您将承担因此对您自身、他人及<b>洋老板商城</b>造成的全部不利后果。</p>\n' +
            '                    <p>7、<b>洋老板商城</b>依法保障您在安装或使用过程中的知情权和选择权，在您使用<b>洋老板商城</b>服务过程中，涉及您设备自带功能的服务会提前征得您同意，一经您的确认，<b>洋老板商城</b>有权开启包括但不限于收集地理位置、读取通讯录、使用摄像头、启用录音等提供服务必要的辅助功能。</p>\n' +
            '                    <p>8、<b>洋老板商城</b>有权根据实际情况，在法律规定范围内自行决定单个用户在软件及服务中数据的最长储存期限以及用户日志的储存期限，并在服务器上为其分配数据最大存储空间等。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">（二）用户依法履行义务</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>本协议依据国家相关法律法规规章制定，您同意严格遵守以下义务：</p>\n' +
            '                    <p>1、不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；</p>\n' +
            '                    <p>2、从中国大陆向境外传输资料信息时必须符合中国有关法规；</p>\n' +
            '                    <p>3、不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；</p>\n' +
            '                    <p>4、不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；</p>\n' +
            '                    <p>5、不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；</p>\n' +
            '                    <p>6、不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；</p>\n' +
            '                    <p>7、不得教唆他人从事本条所禁止的行为；</p>\n' +
            '                    <p>8、不得利用在<b>洋老板商城</b>注册的账户进行非法牟利性经营活动，不得在交易过程中采取不正当竞争行为，不得扰乱网上交易的正常秩序，不从事与网上交易无关的行为；</p>\n' +
            '                    <p>9、不得在<b>洋老板商城</b>恶意评价其他用户，或采取不正当手段提高自身的信用度或降低其他用户的信用度；</p>\n' +
            '                    <p>10、不得发布任何侵犯他人著作权、商标权、专利权等知识产权或合法权利的内容，如果有其他用户或权利人发现您发布的信息涉嫌知识产权、或其他合法权益争议的，这些用户或权利人有权要求<b>洋老板商城</b>删除您发布的信息，或者采取其他必要措施予以制止，<b>洋老板商城</b>将会依法采取这些措施；</p>\n' +
            '                    <p>11、不得对<b>洋老板商城</b>上任何数据作商业性利用，包括但不限于在未经<b>洋老板商城</b>事先书面批准的情况下，以复制、传播等方式使用在<b>洋老板商城</b>展示的任何资料；</p>\n' +
            '                    <p>12、不得利用任何非法手段获取其他用户个人信息，不得将其他用户信息用于任何营利或非营利目的，不得泄露其他用户或权利人的个人隐私。否则<b>洋老板商城</b>有权采取合理措施制止您的上述行为，情节严重的，将提交公安机关进行刑事立案；</p>\n' +
            '                    <p>13、不得发布存在可能破坏、篡改、删除、影响<b>洋老板商城</b>任何系统正常运行或未经授权秘密获取<b>洋老板商城</b>及其他用户的数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码；</p>\n' +
            '                    <p>14、不得干扰<b>洋老板商城</b>上进行的任何交易、活动，不得以任何方式干扰或试图干扰<b>洋老板商城</b>的正常运作。</p>\n' +
            '                    <p>您应不时关注并遵守<b>洋老板商城</b>不时公布或修改的各类合法规则规定。<b>洋老板商城</b>保有删除站内各类不符合法律政策或不真实的信息内容而无须通知您的权利。修改后的规则规定仍对您有约束力。</p>\n' +
            '                    <p>若您未遵守以上规定的，<b>洋老板商城</b>有权作出独立判断并采取暂停或关闭您帐号等措施。您须对自己在网上的言论和行为承担法律责任。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">（三) 商品信息</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p><b>洋老板商城</b>上的商品价格、数量、是否有货等商品信息随时都有可能发生变动，<b>洋老板商城</b>不作特别通知。由于网站上商品信息的数量极其庞大，虽然<b>洋老板商城</b>会尽最大努力保证您所浏览商品信息的准确性，但由于众所周知的互联网技术因素等客观原因存在，<b>洋老板商城</b>网页显示的信息可能会有一定的滞后性或差错，对此情形您知悉并理解；<b>洋老板商城</b>欢迎纠错，并会视情况给予纠错者一定的奖励。</p>\n' +
            '                    <p>为表述便利，商品和服务简称为"商品"或"货物"。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">（四）订单</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、在您下订单时，应仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。收货人与您本人不一致的，收货人的行为和意思表示视为您的行为和意思表示，您应对收货人的行为及意思表示的法律后果承担连带责任。</p>\n' +
            '                    <p>2、除法律另有强制性规定外，双方约定如下：<b>洋老板商城</b>上销售方展示的商品和价格等信息仅仅是交易信息的发布，您下单时须填写希望购买的商品数量、价款及支付方式、收货人、联系方式、收货地址等内容；系统生成的订单信息是计算机信息系统根据您填写的内容自动生成的数据，仅是您向销售方发出的交易诉求；销售方收到您的订单信息后，只有在销售方将您在订单中订购的商品从仓库实际直接向您发出时（以商品出库为标志），方视为您与销售方之间就实际直接向您发出的商品建立了交易关系；如果您在一份订单里订购了多种商品并且销售方只给您发出了部分商品时，您与销售方之间仅就实际直接向您发出的商品建立了交易关系；只有在销售方实际直接向您发出了订单中订购的其他商品时，您和销售方之间就订单中该其他已实际直接向您发出的商品才成立交易关系。您可以随时登录您在<b>洋老板商城</b>注册的账户，查询您的订单状态。</p>\n' +
            '                    <p>3、由于市场变化及各种以合理商业努力难以控制的因素的影响，<b>洋老板商城</b>无法保证您提交的订单信息中希望购买的商品都会有货；如您拟购买的商品，发生缺货，您有权取消订单。</p>\n' +
            '                    <p>4、为了节省您的预算、等待时间，您在付款时订单信息已同时发送至海外仓库和海关，因此订单一旦审核通过则表示仓库人员和海关人员已经提取信息开始准备发送货物的相关手续，所以此时您无法将订单取消，也不能申请退款，如有疑问，详情请咨询客服。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">(五) 配送</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、销售方将会把商品（货物）送到您所指定的收货地址，所有在<b>洋老板商城</b>上列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的。您应当准确地填写您的送货地址、联系人及联系方式等配送信息，您所购买的商品应仅由您填写的联系人接受身份查验后接收商品。</p>\n' +
            '                    <p>2、因如下情况造成订单延迟或无法配送等，<b>洋老板商城</b>与销售方均不承担责任：</p>\n' +
            '                    <p>（1）您提供的信息错误、地址不详细等原因导致的；</p>\n' +
            '                    <p>（2）货物送达后无人签收，导致无法配送或延迟配送的；</p>\n' +
            '                    <p>（3）情势变更因素导致的；</p>\n' +
            '                    <p>（4）不可抗力因素导致的，例如：自然灾害、交通戒严、突发战争等；</p>\n' +
            '                    <p>（5）因节假日、大型促销活动、铺庆、预购或抢购人数众多等原因导致的；</p>\n' +
            '                    <p>（6）未能在<b>洋老板商城</b>上列出的送货参考时间内送货的；</p>\n' +
            '                    <p>（7）因您变更联系人或相关配送信息而造成的损失。</p>\n' +
            '                    <p>3、海外仓发货商品，一般情况下，商品将于您下单付款后的5个工作日内发出，15至30天内送达您的手中，具体配送时间根据商品的配送地址而定；内地仓和香港仓发货商品，一般情况下，商品将于您下单付款后1至3个工作日内发出，3至10日内送达您的手中，具体配送时间根据具体商品的配送地址而定。</p>\n' +
            '                    <p>4、对于海外仓库直邮商品，区分仓库，单仓单笔订单满300元包邮（成为洋店铺即可享受满199元包邮优惠），不足则收取30元运费；对于国内仓及香港仓发货的商品，不分仓库可合并订单，合并订单满99元包邮，不足则收取10元运费；运费具体金额请在订单确认页面查看。<b>洋老板商城</b>有权根据实际情况调整包邮政策，并在网站公示。</p>\n' +
            '                    <p>5、当包裹送达时，务必在快递员面前拆开包裹，检查货物，确认商品（是否破损、是否与购买的相符、是否数量不正确），如有不符，请当面与快递员拍照存档，并及时联系<b>洋老板商城</b>客服反映情况，否则<b>洋老板商城</b>无法受理理赔要求。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">(六) 售后</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、<b>洋老板商城</b>提供7天内质量问题无忧退货，7天无忧退货期限自您收到洋老板商品之日起算，保税商品一经售出非质量问题不予退货，因质量问题的退货请保持商品及相关配件、单据完整。</p>\n' +
            '                    <p>2、产品因质量或损坏问题，请您联系在线客服，按照要求将商品退至<b>洋老板商城</b>，如情况属实，将为您重新发货，请耐心等待；如因个人原因造成任何损坏，<b>洋老板商城</b>概不退换。</p>\n' +
            '                    <p>3、<b>洋老板商城</b>跨境类的产品属于海外的商品，商品质量和包装标识以其他国家及地区为标准，并且此类商品无法开具发票，您购买视同知情及认可。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">(七) 所有权及知识产权条款</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、您一旦接受本协议，即表明您主动将您在任何时间段在<b>洋老板商城</b>发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给<b>洋老板商城</b>所有，<b>洋老板商城</b>有权再授权给其他第三方使用，您同意<b>洋老板商城</b>有权就任何主体侵权而单独提起诉讼，您同意<b>洋老板商城</b>存储、使用、复制、修订、编辑、发布、展示、翻译、分发您在<b>洋老板商城</b>发表的任何形式的信息内容或制作其派生作品，并以已知或日后开发的形式，通过媒体或技术将上述信息纳入其它作品内。</p>\n' +
            '                    <p>2、本协议已经构成《中华人民共和国著作权法》第二十五条（条文序号依照2011年版著作权法确定）及相关法律规定的著作财产权等权利转让书面协议，其效力及于用户在<b>洋老板商城</b>上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。</p>\n' +
            '                    <p>3、您同意并已充分了解本协议的条款，承诺不将已发表于<b>洋老板商城</b>的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。</p>\n' +
            '                    <p>4、广州海货电子商务有限公司是<b>洋老板商城</b>网站（包括海货平台网站、客户端等软件）的制作者,拥有网站内容及资源（包括但不限于：编码、商标、服务标志、图片、资讯、资料、网页设计、肖像、文字内容、按钮图标）的著作权等合法权利受国家法律保护, 您不得对<b>洋老板商城</b>网站等软件进行反向工程、反向汇编、反向编译、以其他方式尝试发现软件的源代码或试图篡改。广州海货电子商务有限公司有权不时地对本协议及本站的内容进行修改，并在本站张贴，无须另行通知用户。在法律允许的最大限度范围内，广州海货电子商务有限公司对本协议及本站内容拥有解释权。</p>\n' +
            '                    <p>5、除法律另有强制性规定外，未经<b>洋老板商城</b>明确的特别书面许可,任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本站的信息内容，否则，<b>洋老板商城</b>有权追究其法律责任。</p>\n' +
            '                    <p>6、本站所刊登的资料信息（诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和软件），均是广州海货电子商务有限公司或其内容提供者的财产，受中国和国际版权法的保护。<b>洋老板商城</b>上所有内容的汇编是广州海货电子商务有限公司的排他财产，受中国和国际版权法的保护。<b>洋老板商城</b>上所有软件都是广州海货电子商务有限公司或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">(八) 责任限制及不承诺担保</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、除非另有明确的书面说明, <b>洋老板商城</b>及其所包含的或以其它方式通过<b>洋老板商城</b>提供给您的全部信息、内容、材料、产品（包括软件）和服务，均是在"按现状"和"按现有"的基础上提供的。</p>\n' +
            '                    <p>2、鉴于<b>洋老板商城</b>具备存在海量信息及信息网络环境下信息与实物相分离的特点，<b>洋老板商城</b>不能控制交易所涉及的物品的质量、安全或合法性，商贸信息的真实性或准确性，以及交易方履行其在贸易协议项下的各项义务的能力，对此您应谨慎判断。除非另有明确的书面说明, 广州海货电子商务有限公司不对<b>洋老板商城</b>上的商品信息、内容、材料等作任何形式的、明示或默示的担保（根据中华人民共和国法律另有规定的以外）。 广州海货电子商务有限公司不担保<b>洋老板商城</b>所包含的或以其它方式通过<b>洋老板商城</b>提供给您的全部信息、内容或从本站发出的电子信件、信息没有病毒或其他有害成分。 如因不可抗力或其它<b>洋老板商城</b>无法控制的原因使<b>洋老板商城</b>销售系统崩溃或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，广州海货电子商务有限公司会合理地尽力协助处理善后事宜。</p>\n' +
            '                    <p>3、<b>洋老板商城</b>有权从完成交易、提供配送、售后及客户服务、开展活动、完成良好的客户体验等多种角度收集您的信息（包括但不限于：涉及您真实姓名/名称、通信地址、联系电话、电子邮箱、订单详情、评价或反馈、投诉内容、cookies等信息），并将对其中涉及个人隐私信息予以严格保密。<b>洋老板商城</b>采用符合业界标准的安全防护措施来防止您的个人信息遭到未经授权的访问、公开披露、使用、修改、损坏或丢失，并努力使用各种合理的制度、技术、程序以及物理层面的措施来保护您的个人信息不被未经授权的访问、篡改、披露或破坏。您了解并同意，<b>洋老板商城</b>有权应国家有关机关的要求，向其提供您在<b>洋老板商城</b>的用户信息和交易记录等必要信息。如您涉嫌侵犯他人合法权益，<b>洋老板商城</b>有权在初步判断涉嫌侵权行为可能存在的情况下，向权利人提供您必要的个人信息。</p>\n' +
            '                    <p>4、您在<b>洋老板商城</b>平台上使用第三方提供的产品或服务时，除应遵守本协议之外，还应遵守第三方用户协议。您与任何第三方交易所产生的风险应由您自行承担。</p>\n' +
            '                    <p>5、<b>洋老板商城</b>不提供直接的支付结算服务，您的线上结算均通过本系统集成的第三方支付网关完成付款。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">第三部分 注销须知</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、如您需要注销您的<b>洋老板商城</b>账户，应先经<b>洋老板商城</b>审核同意。<b>洋老板商城</b>注销该账户，即表明<b>洋老板商城</b>与您之间的协议已解除，但您仍应对您使用本服务期间的行为承担可能的违约或损害赔偿责任。</p>\n' +
            '                    <p>2、您注销账户的行为会给您的售后维权带来诸多不便，您将无法再登录、使用<b>洋老板商城</b>账户，也将无法找回您账户中及与账户相关的任何内容或信息。您的账户注销后，本协议终止，<b>洋老板商城</b>无法协助您重新恢复原账户的使用。除法律有明确规定外，<b>洋老板商城</b>无义务向您或您指定的第三方披露您账户中的任何信息。请您审慎选择注销账户。</p>\n' +
            '                    <p>3、如果您申请注销账户，您的账户需同时满足以下条件：</p>\n' +
            '                    <p>（1）在最近一个月内，账户没有进行更改密码、更改绑定信息等敏感操作，账户没有被盗、被封等风险；</p>\n' +
            '                    <p>（2）账户在<b>洋老板商城</b>系统中无资产和虚拟权益、无欠款；</p>\n' +
            '                    <p>（3）账户内无未完成的订单、服务，且所有订单完成达一年以上；</p>\n' +
            '                    <p>（4）账户无任何纠纷，包括投诉举报或被投诉举报；</p>\n' +
            '                    <p>（5）账户为正常使用中的账户且无任何账户被限制的记录；</p>\n' +
            '                    <p>（6）账户已经解除与其他网站、其他APP的授权登录或绑定关系。</p>\n' +
            '                    <p>（7）<b>洋老板商城</b>出于维护交易安全和市场公平而提出的其他条件。</p>\n' +
            '                    <p>4、在您的账户注销期间，如果您的账户涉及争议纠纷，包括但不限于投诉、举报、诉讼、仲裁、国家有权机关调查等，<b>洋老板商城</b>有权自行终止您的账户的注销申请而无需另行得到您的同意。</p>\n' +
            '                    <p>5、注销<b>洋老板商城</b>账户并不代表账户注销前的账户行为和相关责任得到豁免或减轻。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">第四部分 服务的中断和终止</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>（一）在下列情况下，您可以中断或终止服务：</p>\n' +
            '                    <p>1、在满足<b>洋老板商城</b>公示的账户注销条件时，您可申请注销您的账户；</p>\n' +
            '                    <p>2、变更事项生效前您停止使用并明示不愿接受变更事项的；</p>\n' +
            '                    <p>3、您明示不愿继续使用<b>洋老板商城</b>服务，且符合<b>洋老板商城</b>终止条件的。</p>\n' +
            '                    <p>（二）在下列情况下，<b>洋老板商城</b>可以中断或终止服务：</p>\n' +
            '                    <p>1、在您违反本协议相关规定时，<b>洋老板商城</b>有权终止向您提供服务。如您在被<b>洋老板商城</b>终止提供服务后，再一次直接或间接或以他人名义注册为<b>洋老板商城</b>用户的，<b>洋老板商城</b>有权再次单方面终止提供服务；</p>\n' +
            '                    <p>2、如<b>洋老板商城</b>通过您提供的信息与您联系时，发现您在注册时填写的电子邮箱已不存在或无法接收电子邮件的，经<b>洋老板商城</b>以其它联系方式通知用户更改，而您在三个工作日内仍未能提供新的电子邮箱地址的，<b>洋老板商城</b>有权终止提供服务；</p>\n' +
            '                    <p>3、<b>洋老板商城</b>发现您注册数据中主要内容是虚假的或不完整，<b>洋老板商城</b>有权随时终止向您提供服务；</p>\n' +
            '                    <p>4.、本协议终止或更新时，您明示不愿接受新的服务协议的并通知到<b>洋老板商城</b>；</p>\n' +
            '                    <p>5、您通过非<b>洋老板商城</b>提供或认可的方式或通过其他不合法的方式，获取<b>洋老板商城</b>提供的补贴，包括但不限于红包、代金券、优惠券等形式；</p>\n' +
            '                    <p>6.、销售商品为侵犯他人知识产权或其它合法权益的物品，违背社会公共利益或公序良俗的、或是<b>洋老板商城</b>认为不适合在洋老板平台上销售的物品；</p>\n' +
            '                    <p>7、您盗用他人账户、发布违禁信息、骗取他人财物、售假、扰乱市场秩序、采取不正当手段谋利等行为；</p>\n' +
            '                    <p>8、因您多次违反<b>洋老板商城</b>相关规定且情节严重；</p>\n' +
            '                    <p>9、其它<b>洋老板商城</b>认为需终止服务的情况。</p>\n' +
            '                    <p>（三）中断或终止服务后的处理</p>\n' +
            '                    <p>1、本协议终止后，除法律有明确规定外，<b>洋老板商城</b>没有义务为您提供原账号中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给您或第三方。此外，您同意，<b>洋老板商城</b>不就终止服务而对您或任何第三者承担任何责任。</p>\n' +
            '                    <p>2、 注销该用户账号后，<b>洋老板商城</b>仍保留下列权利：</p>\n' +
            '                    <p>（1）继续保存您留存于<b>洋老板商城</b>的各类信息；</p>\n' +
            '                    <p>（2）对于您过往的违约行为，<b>洋老板商城</b>仍可依据本协议向您追究违约责任。</p>\n' +
            '                    <p>3、本协议终止后，对于您在本协议存续期间产生的交易订单，<b>洋老板商城</b>可通知交易相对方并根据交易相对方的意愿决定是否关闭该等交易订单；如交易相对方要求继续履行的，则您应当就该等交易订单继续履行本协议及交易订单的约定，并承担因此产生的任何损失或增加的任何费用。</p>\n' +
            '                    <p>4、服务中断、终止之前交易行为的处理因您违反法律法规或者违反本协议规定而致使<b>洋老板商城</b>中断、终止服务的，对于服务中断、终止之前您的交易行为依下列原则处理：</p>\n' +
            '                    <p>（1）服务中断、终止之前，您已经上传至<b>洋老板商城</b>平台的物品尚未交易或尚未交易完成的，<b>洋老板商城</b>有权在中断、终止服务的同时删除此项物品的相关信息；</p>\n' +
            '                    <p>（2）服务中断、终止之前，您已经就其它用户出售的具体物品作出要约，但交易尚未结束，<b>洋老板商城</b>有权在中断或终止服务的同时删除您的相关要约；</p>\n' +
            '                    <p>（3）服务中断、终止之前，您已经与另一用户就具体交易达成一致，<b>洋老板商城</b>可以不删除该项交易，但<b>洋老板商城</b>有权在中断、终止服务的同时将您被中断或终止服务的情况通知交易对方。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">第五部分 交易争议解决</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>您在<b>洋老板商城</b>交易过程中发生争议的，可选择以下途径解决：</p>\n' +
            '                    <p>1、与争议相对方自主协商；</p>\n' +
            '                    <p>2、提交<b>洋老板商城</b>客服解决；</p>\n' +
            '                    <p>3、请求消费者协会或者其他依法成立的调解组织调解；</p>\n' +
            '                    <p>4、向有关行政部门投诉；</p>\n' +
            '                    <p>5、根据与争议相对方达成的仲裁协议（如有）提请仲裁机构仲裁；</p>\n' +
            '                    <p>6、向人民法院提起诉讼（任何发生在您与<b>洋老板商城</b>之间的争议，不能协商解决的，应提交<b>洋老板商城</b>登记注册所在地的人民法院管辖）。</p>\n' +
            '                    <p>如您选择提交<b>洋老板商城</b>客服解决，则表示您认可<b>洋老板商城</b>作为中立第三方依据所了解到的争议事实并依据<b>洋老板商城</b>纠纷处理规则作出的决定。您理解并同意，在争议调处服务中，<b>洋老板商城</b>的客服并非专业人士，仅能以普通人的认知对您提交的凭证进行判断。因此，除存在故意或重大过失外，<b>洋老板商城</b>对争议调处决定免责。如您不满意<b>洋老板商城</b>作出的决定，您仍有权采取其他争议处理途径解决争议，但通过其他争议处理途径未取得终局决定前，您仍应先履行调处决定。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">第六部分 违约处理</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、如果<b>洋老板商城</b>发现或收到他人举报投诉您违反本协议约定，或有违法不当行为的，<b>洋老板商城</b>有权不经通知立即对相应信息进行删除、屏蔽处理，并视行为情节对您的帐号处以包括但不限于警告、限制或采取中止或终止协议的措施、帐号封禁直至注销的处罚。</p>\n' +
            '                    <p>2、<b>洋老板商城</b>有权依据合理判断对您违反有关法律法规或本协议规定的行为采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，您应独自承担由此而产生的一切法律责任。</p>\n' +
            '                    <p>3、您理解并同意，因您违反有关法律法规或者本协议之规定，导致或产生第三方主张的任何索赔、要求或损失，或任何行政管理部门的处罚，您应当独立承担责任。如您的行为导致<b>洋老板商城</b>遭受损失的，您也应当一并赔偿（包括但不限于直接经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等间接经济损失）。如您的行为使<b>洋老板商城</b>遭受第三人主张权利，<b>洋老板商城</b>可在对第三人承担金钱给付等义务后就全部损失向您追偿。</p>\n' +
            '                    <p>4、<b>洋老板商城</b>可将对您上述违约行为处理措施信息以及经国家行政或司法机关生效法律文书确认的违法信息等在<b>洋老板商城</b>上予以公示。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">第七部分 系统中断或故障</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>系统因下列状况无法正常运作，使您无法使用各项服务时，<b>洋老板商城</b>不承担损害赔偿责任，该状况包括但不限于：</p>\n' +
            '                    <p>1、在<b>洋老板商城</b>网站公告之系统停机维护期间出现系统中断或故障；</p>\n' +
            '                    <p>2、电信设备出现故障不能进行数据传输的；</p>\n' +
            '                    <p>3、因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成<b>洋老板商城</b>系统障碍不能执行业务的；</p>\n' +
            '                    <p>4、由于黑客攻击、电信部门技术调整或故障、网站升级、银行方面的问题等原因而造成的服务中断或者延迟；</p>\n' +
            '                    <p>6、第三方未经批准的接入或第三方更改用户的传输数据或数据；</p>\n' +
            '                    <p>7、第三方对服务的声明或关于服务的行为、第三方服务的瑕疵；</p>\n' +
            '                    <p>8、非因<b>洋老板商城</b>的原因而引起的与服务有关的任何其它事宜，包括疏忽。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">第八部分 法律适用管辖</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国大陆地区适用的有效法律（但不包括其冲突法规则）。没有相关法律规定的，参照通用国际商业惯例和（或）行业惯例。一旦您使用本服务，您和<b>洋老板商城</b>即受本协议所有组成部分的约束。本协议部分内容被有管辖权的法院认定为违法的，不因此影响其他内容的效力。</p>\n' +
            '                    <p>2、如缔约方就本协议内容或其执行发生任何争议，争议应尽力友好协商解决；协商不成时，任何一方可向<b>洋老板商城</b>所在地人民法院提起诉讼。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">第九部分 其他</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、您在使用<b>洋老板商城</b>某一特定服务时，该服务可能会另有单独的协议、相关业务规则等，您在使用该项服务前请阅读并同意相关的单独协议；您使用前述特定服务，即视为您已阅读并同意接受相关单独协议。</p>\n' +
            '                    <p>2、本协议列明的条款并不能完整罗列并覆盖您与<b>洋老板商城</b>所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此，<b>洋老板商城</b>法律声明及隐私权政策、<b>洋老板商城</b>规则均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用<b>洋老板商城</b>服务，视为您同意上述补充协议。</p>\n' +
            '                </div>\n' +
            '                <div class="agreementTips">第九部分 其他</div>\n' +
            '                <div class="agreementParagraph">\n' +
            '                    <p>1、您在使用<b>洋老板商城</b>某一特定服务时，该服务可能会另有单独的协议、相关业务规则等，您在使用该项服务前请阅读并同意相关的单独协议；您使用前述特定服务，即视为您已阅读并同意接受相关单独协议。</p>\n' +
            '                    <p>2、本协议列明的条款并不能完整罗列并覆盖您与<b>洋老板商城</b>所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此，<b>洋老板商城</b>法律声明及隐私权政策、<b>洋老板商城</b>规则均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用<b>洋老板商城</b>服务，视为您同意上述补充协议。</p>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="agreeShadow"></div>\n' +
            '            <div class="agreementReturn">\n' +
            '                返回\n' +
            '            </div>'+
            '       </div>'+'</div>';
        _html = $(_html);
        obj.append(_html);
        return _html;
    }
    function readyLogin(obj) {
        obj.find('input').val('');
        clearInterval(sencode);
        time = 60;
        $('.preGetCode').html('获取验证码');
        $('.voiceCode span').show();
        $('.agreement').removeClass('popup');
        $('.preGetCode').show();
        $('.getCode').hide();
        code = false;
    }
    function initEvent(obj) {
        initClosePopupEvent(obj);
        initGobackEvent();
        initTipsEvent(obj);
        initShowSubmitEvent(obj);
        initToPasswordLoginEvent(obj);
        initToCodeLoginEvent(obj);
        initPasswordSecretEvent(obj);
        initRetrievePasswordEvent(obj);
        initGetCodeEvent(obj);
        initSubmitEvent(obj);
        initCodeStatusEvent(obj);
        bindLoginBackBtnEvent();
    }
    function bindLoginBackBtnEvent() {
        cacheDom.$loginBackBtn.click(function(){
            popupHide();
        });
    }
    function initClosePopupEvent(obj) {
        obj.on('click',".closePopup",function () {
            popupHide()
        });
    }
    function initGobackEvent() {
        $('.iba-nav-back').click(function () {
            goBack()
        });
    }
    function initTipsEvent(obj) {
        obj.on('click',".agreement span a",function () {
            if(loginOptions.popupShow ===true){
                $('.loginContainer').addClass('agreementPopup');
            }else {
                window.location.href = '/user/service-agreement.html'
            }
        });
        obj.on('click',".agreementReturn",function () {
            $('.loginContainer').removeClass('agreementPopup');
        });
    }
    function checkPasswordSubmitShow(){
        if($('#accountPassword').val().length ===11 && $('#password').val().length >= 6 ){
            $('.preSubmit').hide();
            $('.passwordSubmit').show();
        }else{
            $('.preSubmit').show();
            $('.passwordSubmit').hide();
        }
    }
    function checkSubmitBtnShow(){
        if($('#account').val().length ===11 && $('#code').val().length ===6){
            $('.preSubmit').hide();
            $('.submit').show();
        }else{
            $('.preSubmit').show();
            $('.submit').hide();
        }
    }
    function initShowSubmitEvent(obj) {
        obj.on('input propertychange',"#accountPassword, #password",function () {
            checkPasswordSubmitShow();
        });
        obj.on('input propertychange',"#code",function () {
            checkSubmitBtnShow();
        });
        obj.on("click", "#account",function () {
            $("#account").focus();
        });
        obj.on("click", "#code",function () {
            $("#code").focus();
        });
        obj.on("click", "#password",function () {
            $("#password").focus();
        });
    }
    function initToPasswordLoginEvent(obj) {
        obj.on("click", ".passwordLogin",function () {
            $('#code').val('');
            passwordLogin();
        });
    }
    function initToCodeLoginEvent(obj) {
        obj.on("click", ".register, .codeLogin",function () {
            $('.accountPhone').val($('.accountPassword').val());
            $('.accountPhone').show();
            $('.code').show();
            $('.voiceCode').show();
            $('.passwordLogin').show();
            $('.agreement').show();
            $('.preSubmit').show();
            $('.accountPassword').hide();
            $('.password').hide();
            $('.passwordSubmit').hide();
            $('.register').hide();
            $('.codeLogin').hide();
            $('#password').val('');
            $('section .preGetCode').show();
            $('section .voiceCode span').show();
        });
    }
    function initPasswordSecretEvent(obj) {
        obj.on("click", ".passwordSecret",function () {
            if($(this).hasClass('secret')){
                $('#password').attr('type','text');
                $('.passwordSecret').removeClass('secret');
            }else {
                $('.passwordSecret').addClass('secret')
                $('#password').attr('type','password')
            }
        });
    }
    function initRetrievePasswordEvent(obj) {
        obj.on("click", ".retrievePassword",function () {
            window.location.href='/user/forget-password.html'
        });
    }
    function initGetCodeEvent(obj) {
        obj.on("click", ".getCode",function () {
            if(checkAccount($('#account').val())===true){
                sendsms($('#account').val())
            }else {
                common.toast('请输入正确的手机号')
            }
        });
        obj.on("click", "#getVoiceCode",function () {
            if(checkAccount($('#account').val())===true){
                sendVoiceSms($('#account').val())
            }else {
                common.toast('请输入正确的手机号')
            }

        });
    }
    function initSubmitEvent(obj) {
        obj.on("click", ".submit",function () {
            if(checkAccount($('#account').val())===true){
                codeSubmit()
            }else {
                common.toast('请输入正确的手机号')
            }
        });
        obj.on("click", ".passwordSubmit",function () {
            if(checkAccount($('#accountPassword').val())===true){
                passwordSubmit()
            }else {
                common.toast('请输入正确的手机号')
            }
        });
    }
    function initCodeStatusEvent(obj) {
        obj.on("input propertychange", "#account",function () {
            if ($(this).val().length ===11){
                if(time === 0||time ===60){
                    $('.preGetCode').hide();
                    $('.getCode').show();
                }else {
                }
            }else if($(this).val().length !==11){
                if(time === 0||time ===60){
                    if(code ===true){
                        $('.preGetCode').html('重新发送');
                        $('.preGetCode').show();
                        $('.getCode').hide()
                    }else{
                        $('.preGetCode').html('获取验证码');
                        $('.preGetCode').show();
                        $('.getCode').hide()
                    }
                } else {
                }
            }
            checkSubmitBtnShow();
        })
    }
    function goBack(){
        var hisUrl = common.getSessionStorage('hisUrl');
        var currentPageLoginHisUrl = common.getSessionStorage('currentPageLoginHisUrl');

        if(currentPageLoginHisUrl){
            common.setSessionStorage('currentPageLoginHisUrl','');
            gotoPageUrl(currentPageLoginHisUrl,"replace");
            return;
        }

        //只有历史记录是 线下推广详情页 才返回详情页
        if(hisUrl&&!isLoginUrl(hisUrl)&& /#offlineAct=/ig.test(hisUrl)){
            common.setSessionStorage('hisUrl',"");
            // location.replace(hisUrl);
            gotoPageUrl(hisUrl,"replace");
        }else{
            // window.location.href ="/index.html";
            // gotoPageUrl("/index.html");
            commonGoBack && commonGoBack();
        }
    }
    function sendsms(acc){
        var account = Base64.encode(acc);
        var url = "/app/user/smsgcode";
        var params = {
            "reqBody":"{'account':'"+account+"'}"
        };
        common.ajax("GET",url, params,null, sendsmscallback, function(){
        });
    }
    function sendVoiceSms(acc) {
        var account = Base64.encode(acc);
        var url = "/app/user/sms/voice/{"+account+"}";
        // $("#send-msg-code-id").addClass("user-codes-li2");

        common.ajax("GET",url, null,null, sendVoiceSmscallback, function(){
            // $("#send-msg-code-id").removeClass("user-codes-li2");
        });
    }
    function popupShow(options) {
        loginOptions=options;
        loginOptions.popupShow = true;
        $('.loginWrapper,.mask').addClass('show');

    }
    function popupHide() {
        $('.loginWrapper ,.mask').removeClass('show');
        clearInterval(sencode);
    };
    function codeSubmit() {
        var url = "/app/user/login-register";
        var reqBody = new Object();
        var acc = $('#account').val();
        var msgcode = $('#code').val();
        var zhuajianqiangSrc = common.getSessionStorage("userSrc");
        var coup = common.getQueryStr("coup");
        reqBody.account = Base64.encode(acc);
        reqBody.verCode = Base64.encode(msgcode);
        reqBody.loginType = 2;
        if(loginOptions.coup==1||coup ==1){
            reqBody.coup = 1;
        }
        if(loginOptions.thirdPartyChannel&&loginOptions.thirdPartyChannel!=0){
            reqBody.thirdPartyChannel =loginOptions.thirdPartyChannel;
        }
        if (!!zhuajianqiangSrc && zhuajianqiangSrc == 8){
            reqBody.src = zhuajianqiangSrc;
        }
        var ditch = common.getSessionStorage("ditch");
        if(ditch != null && ditch != ''){
            reqBody.ditch = ditch;
        }
        var src = common.getSessionStorage("userSrc");
        if(src != undefined && src != "" && src != null) {
            if ("3" == src || 3 == src){
                var physicalShopId = common.getSessionStorage("physicalShopId");
                if(common.isNotEmptyString(physicalShopId)) {
                    reqBody.physicalShopId = physicalShopId;
                }
            }
            reqBody.src = Base64.encode(src);
        }
        var openId = common.getSessionStorage("openId");
        if (undefined == openId || null == openId){
            openId = "";
        }else{
            openId = Base64.encode(openId);
        }
        reqBody.openId = openId;
        //店铺拉新记录店铺ID
        var rid = common.getSessionStorage("rid");
        if (!!rid) {
            reqBody.shareUid = rid;
        }else{
            // 空的时候入参 rid=''
            reqBody.shareUid = '';
        }

        var param = new Object();
        //alert(reqBody.openId);
        param.reqBody = reqBody;
        //alert(JSON.stringify(param));
        common.showLoading();
        common.ajax("POST",url, param, registCallback,function(data){
            common.hideLoading();
            if(data.resultCode === 0){
                common.setSessionStorage("rid","");
            }else{
                common.toast(data.message)
            }
            common.deleteCookie("userSrc");
        } ,function () {
            common.hideLoading();
            common.toast('网络繁忙,请稍后重试')
        } );
    }
    function passwordSubmit() {
        var url = "/app/user/login-register";
        var reqBody = new Object();
        var acc = $('#accountPassword').val();
        var password = $('#password').val();
        var zhuajianqiangSrc = common.getSessionStorage("userSrc");
        var coup = common.getQueryStr("coup");
        reqBody.account = Base64.encode(acc);
        reqBody.password = Base64.encode(MD5.md5(password));
        reqBody.loginType = 1;
        if(loginOptions.coup==1||coup ==1){
            reqBody.coup = 1;
        }
        if(loginOptions.thirdPartyChannel&&loginOptions.thirdPartyChannel!=0){
            reqBody.thirdPartyChannel =loginOptions.thirdPartyChannel;
        }
        if (!!zhuajianqiangSrc && zhuajianqiangSrc == 8){
            reqBody.src = zhuajianqiangSrc;
        }
        var ditch = common.getSessionStorage("ditch");
        if(ditch != null && ditch != ''){
            reqBody.ditch = ditch;
        }
        var src = common.getSessionStorage("userSrc");
        if(src != undefined && src != "" && src != null) {
            if ("3" == src || 3 == src){
                var physicalShopId = common.getSessionStorage("physicalShopId");
                if(common.isNotEmptyString(physicalShopId)) {
                    reqBody.physicalShopId = physicalShopId;
                }
            }
            reqBody.src = Base64.encode(src);
        }
        var openId = common.getSessionStorage("openId");
        if (undefined == openId || null == openId){
            openId = "";
        }else{
            openId = Base64.encode(openId);
        }
        reqBody.openId = openId;
        //店铺拉新记录店铺ID
        var rid = common.getSessionStorage("rid");
        if (!!rid) {
            reqBody.shareUid = rid;
        }else{
            // 空的时候入参 rid=''
            reqBody.shareUid = '';
        }

        var param = new Object();
        //alert(reqBody.openId);
        param.reqBody = reqBody;
        //alert(JSON.stringify(param));
        common.showLoading();
        common.ajax("POST",url, param, registCallback,function(data){
            common.hideLoading();
            if(data.resultCode === 0){
                common.setSessionStorage("rid","");
            }else{
                common.toast(data.message)
            }
            common.deleteCookie("userSrc");
        },function () {
            common.hideLoading();
            common.toast('网络繁忙,请稍后重试')
        } );
    }
    function registCallback(data){
        if(common.getQueryStr("coup") == '1'){
            common.setSessionStorage("trackId",data.userInfo.trackId);
            checkRedBag(function (){
                loginSucc(data);
            });
        }else{
            loginSucc(data);
        }
    }
    function loginSucc(data){
        if(data&&data.userInfo){
            data = data.userInfo;
            var trackId = data.trackId;
            common.setSessionStorage("trackId",trackId);
            $(".submit").hide();
            $(".preSubnit").show();
            common.toast('登录成功');

            if(data.modifyPassword === true&& loginOptions.popupShow !==true){
                common.setSessionStorage("msgcode",$('#code').val());
                common.setSessionStorage("account",Base64.encode($('#account').val()));
                var url = "/user/forgot-password.html?fromFirstLogin=1";
                if(common.getQueryStr("coup")){
                    url = url + "&coup=1";
                }
                window.location.href = url;
            }else {
                //置空一下参数， 这个是升级弹窗用的
                common.setSessionStorage('up2m','');
                // 置空一下参数，店铺拉新标识店铺ID
                common.setSessionStorage("rid", "");
                if(data.couponCount && data.denomination){
                    common.setSessionStorage('couponCount',data.couponCount);
                    common.setSessionStorage('denomination',data.denomination);
                }
                common.setSessionStorage('trackId',data.trackId);
                // 申请售后测试需要判断account 手机账号
                if(data.user && data.user.account){
                    common.setSessionStorage('account', Base64.encode(data.user.account));
                }

                /**
                 *如果是店铺，登录后会带回加密后的shopId
                 */
                if( data.shopId && "" != data.shopId){
                    common.setSessionStorage("shopId", data.shopId);
                }else {
                    common.setSessionStorage("shopId", "");
                }
                if( data.bmcLevel && null != data.bmcLevel && "" != data.bmcLevel ){
                    common.setSessionStorage("level", data.bmcLevel);
                }else{
                    common.setSessionStorage("level", "");
                }
                common.setSessionStorage("logistSrc","");
                common.getSessionStorage("invCode","");

                var hisUrl = common.getSessionStorage('hisUrl');
                var mobile = common.getQueryStr("mobile"); //有此参数代表是更换手机号码跳转过来的

                if(loginOptions.popupShow ===true){
                    popupHide();
                    loginOptions.success(data);
                }else if(hisUrl&&!isLoginUrl(hisUrl)){
                    common.setSessionStorage('hisUrl',"");
                    common.setSessionStorage('registerBackUrl',"");
                    common.setSessionStorage('currentPageLoginHisUrl',"");
                    gotoPageUrl(hisUrl,"replace");
                }else if(mobile && mobile==1){
                    gotoPageUrl("/user/account.html");
                }else{
                    gotoPageUrl("/index.html");
                }
            }
        }else {
        }
    }
    function isLoginUrl(url){
        if(url.indexOf("/user/logining.html")<0 && url.indexOf("/user/login-binding.html")<0){
            return false;
        }
        return true;
    }
    function sendsmscallback(data){
        if( data.resultCode === 0 ){
            common.toast('验证码发送成功');
            time = 60;
            sencode = setInterval(function (){timeback()}, 1000);
            code = true
        }else{
            common.toast(data.message);
        }
    }
    function sendVoiceSmscallback(data){
        if( data.resultCode === 0 ){
            if(loginOptions.popupShow === true){
                common.toast('我们将以电话形式告知您<br>验证码');
            }else {
                layer.open({
                    content: '我们将以电话的形式告知您验证码<br/> 请注意接听'
                    ,btn: '我知道了'
                    ,className: 'layer-voice-code'
                });
            }
            if(time !==60){
                clearInterval(sencode);
            }
            time = 60;
            sencode = setInterval(function (){timeback(1)}, 1000);
            code = true
        }else {
            common.toast(data.message);
        }
    }
    function timeback(type){
        if(type){
            $('.voiceCode span').hide();
            if(loginOptions.popupShow === true){
                $('.agreement').addClass('popup');
            }
            if(time == 0){
                clearInterval(sencode);
                $('.voiceCode span').show();
                if(loginOptions.popupShow === true){
                    $('.agreement').removeClass('popup');
                }
                if($('#account').val().length>0){
                    $(".getCode").show();
                    $(".preGetCode").hide();
                }else {
                    $(".getCode").hide();
                    $(".preGetCode").show();
                }
            }else{
                time --;
                if (time === 0){
                    $(".getCode").html("重新发送");
                    $(".preGetCode").html("重新发送");
                }else{
                    $(".preGetCode").html("重新发送("+ time +")");
                }
                $(".getCode").hide();
                $(".preGetCode").show();
            }
        }else {
            if(time == 0){
                clearInterval(sencode);
                if($('#account').val().length>0){
                    $(".getCode").show();
                    $(".preGetCode").hide();
                }else {
                    $(".getCode").hide();
                    $(".preGetCode").show();
                }
            }else{
                time --;
                if (time == 0){
                    $(".getCode").html("重新发送");
                    $(".preGetCode").html("重新发送");
                }else{
                    $(".preGetCode").html("重新发送("+ time +")");
                }
                $(".getCode").hide();
                $(".preGetCode").show();

            }
        }

    }
    function checkAccount(phone) {
        var mobile = /^(13[0-9]|12[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(mobile.test(phone) === true){
            return true
        }else {
            return false
        }
    }
    function passwordLogin () {
        $('.accountPassword').val($('.accountPhone').val());
        $('.code').hide();
        $('.accountPhone').hide();
        $('.submit').hide();
        $('.voiceCode').hide();
        $('.passwordLogin').hide();
        $('.agreement').hide();
        $('.accountPassword').show();
        $('.preSubmit').show();
        $('.password').show();
        $('.register').show();
        $('.codeLogin').show();
    }
    function checkRedBag(callBack) {
        common.showLoading();
        var url = "";
        $.ajax({
            type: "GET",
            url: '/app/coupon/getCouponMsg?subtype=0&judgePopupOverTag=1',
            data: {},
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.respHeader.resultCode !== 0) {
                    data.respHeader.message && common.toast(data.respHeader.message);
                } else {
                    if(data.respBody.couponRedPack){
                        url = "/user/redbag-fission.html?redpackId="+data.respBody.couponRedPack.redpackId+"&recommandUid="+data.respBody.couponRedPack.uid;
                    }else{
                        url = "/user/redbag-fission.html?judgePopupOver="+(data.respBody.judgePopupOver?data.respBody.judgePopupOver:2);
                    }
                }
                common.setSessionStorage('hisUrl',url);
                common.setSessionStorage('registerBackUrl',url);
            },
            error: function () {
                common.toast('网络繁忙，请重试');
            },
            complete: function () {
                common.hideLoading();
                callBack && callBack();
            }
        });
    }
    $.fn.extend({
        "showLogin": function (options) {
            options = $.extend({
                showLogin: "",
                showPopup: "",
                style:'',
                thirdPartyChannel: 0,
                coup:0,
                success:function(){
                }
            }, options);
            return init(options,$(this));
        }
    });
})(jQuery)
