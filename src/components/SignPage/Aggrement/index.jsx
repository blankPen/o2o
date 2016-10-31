/*
 * @Author: MoCheng
 */
import './index.less';
import React from 'react';

export default class index extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="aggrement_box">
        <div className="pg-about-terms">
        <div className="mainbox">
        <div className="float-right">本协议于发布之日起的七日后生效</div>
              <h2>雷铭O2O网用户协议</h2>
              <p><strong>雷铭O2O网与用户共同确认：</strong></p>
              <p><strong>1. 用户点击雷铭O2O网注册页面的同意注册按钮并完成注册程序、获得雷铭O2O网账号和密码时，视为用户与雷铭O2O网已达成《雷铭O2O网用户协议》，就用户进入雷铭O2O网消费（即用户通过雷铭O2O网与商家进行团购交易）达成本协议的全部约定。</strong></p>
              <p><strong>2. 雷铭O2O网及用户均已认真阅读本《雷铭O2O网用户协议》(下称“本协议”)中全部条款（特别是以黑体字标示出的关于雷铭O2O网及用户重大权益的条款）及雷铭O2O网发布的其他全部服务条款和操作规则的内容，对本协议及前述服务条款和规则均以知晓、理解并接受，同意将其作为确定双方权利义务的依据。雷铭O2O网《<a href="http://www.meituan.com/about/law">法律声明</a>》为本协议的必要组成部分，用户接受本协议的同时即视为接受雷铭O2O网《<a href="http://www.meituan.com/about/law">法律声明</a>》的全部内容。</strong></p>
              <h4>一、定义条款</h4>
              <ol>
                  <li><span>1.1.</span>“团购”：通过互联网渠道，一定数量的消费者组团，以较低价格购买同一种商品/服务的商业活动。</li>
                  <li><span>1.2.</span>“雷铭O2O网”：北京三快科技有限公司运营和管理的网络交易平台，域名为www.meituan.com, 北京三快科技有限公司通过该网络交易平台为用户和商家提供进行团购交易的网络交易平台服务。本协议下文中，“雷铭O2O网”既指网络交易平台（www.meituan.com），亦指北京三快科技有限公司。</li>
                  <li><span>1.3.</span>“用户”：接受并同意本协议全部条款及雷铭O2O网发布的其他全部服务条款和操作规则、通过雷铭O2O网进行团购交易的雷铭O2O网注册会员。</li>
                  <li><span>1.4.</span>“商家”：通过雷铭O2O网发布团购商品/服务信息、向用户提供团购商品/服务的自然人、法人和其他组织。</li>
                  <li><span>1.5.</span>“团购交易”：用户与商家通过雷铭O2O网进行的交易团购商品/服务的活动。</li>
                  <li><span>1.6.</span>“团购信息”：商家通过雷铭O2O网发布的，在雷铭O2O网页面上展示的团购商品/服务信息，包括但不限于团购商品/服务的名称、种类、数量、质量、价格、有效期、预约时间、商家地址、配送方式、退换货方式、退款条件、售后服务等内容。团购信息在法律上构成商家就团购商品/服务向用户发出的要约。</li>
                  <li><span>1.7.</span>“团购价款”：用户为购买团购商品/服务而应向商家支付的团购商品/服务的对价，团购价款的数额以用户与商家达成的团购订单中约定的团购价格及团购数量为确定依据。</li>
                  <li><span>1.8.</span>“团购电子消费凭证”：由雷铭O2O网以页面、短信、电子邮件或其他方式向用户发送的电子形式的购货凭证或服务单据，内容为雷铭O2O券密码或二维码等（具体根据团购订单确定），用于证明用户已支付团购价款、有权获得所购买的团购商品/服务。</li>
              </ol>
              <h4>二、用户注册</h4>
              <ol>
                  <li><span>2.1.</span>注册资格
                      <p>用户承诺：用户具有完全民事权利能力和行为能力或虽不具有完全民事权利能力和行为能力但经其法定代理人同意并由其法定代理人代理注册及应用雷铭O2O网服务。</p>
                  </li>
                  <li><span>2.2.</span>注册目的
                      <p>用户承诺：用户进行用户注册并非出于违反法律法规或破坏雷铭O2O网网络团购交易秩序的目的。</p>
                  </li>
                  <li><span>2.3.</span>注册流程
                      <ol>
                          <li><span>2.3.1.</span>用户同意根据雷铭O2O网用户注册页面的要求提供有效电子邮箱、所在城市等信息，设置雷铭O2O网账号及密码，用户应确保所提供全部信息的真实性、完整性和准确性。</li>
                          <li><span>2.3.2.</span>用户在注册时有权选择是否订阅雷铭O2O网发送的关于团购信息的电子邮件和/或短信息。</li>
                          <li><span>2.3.3.</span>用户合法、完整并有效提供注册所需信息的，有权获得雷铭O2O网账号和密码，雷铭O2O网账号和密码用于用户在雷铭O2O网进行会员登录。</li>
                          <li><span>2.3.4.</span>用户获得雷铭O2O网账号及密码时视为用户注册成功，用户同意接收雷铭O2O网发送的与雷铭O2O网网站管理、运营相关的电子邮件和/或短消息。</li>
                      </ol>
                  </li>
              </ol>
              <h4>三、用户服务</h4>
              <p>雷铭O2O网为用户通过雷铭O2O网进行网络团购交易活动提供网络交易平台服务，目前雷铭O2O网对用户提供的雷铭O2O网网络交易平台服务为免费服务，但雷铭O2O网保留未来对雷铭O2O网网络交易平台服务收取服务费用的权利。</p>
              <ol>
                  <li><span>3.1.</span>服务内容
                      <ol>
                          <li><span>3.1.1.</span>用户有权在雷铭O2O网浏览团购商品/服务的团购信息、有权通过雷铭O2O网与商家达成团购订单、支付团购价款、获得团购电子消费凭证（如有）等。</li>
                          <li><span>3.1.2.</span>用户有权在雷铭O2O网查看其雷铭O2O网会员账号下的信息，有权应用雷铭O2O网提供的功能进行操作。</li>
                          <li><span>3.1.3.</span>用户有权按照雷铭O2O网发布的活动规则参与雷铭O2O网组织的网站活动。</li>
                          <li><span>3.1.4.</span>雷铭O2O网承诺为用户提供的其他服务。</li>
                      </ol>
                  </li>
                  <li><span>3.2.</span>服务规则
                      <p>用户承诺遵守下列雷铭O2O网服务规则：</p>
                      <ol>
                          <li><span>3.2.1.</span>用户应当遵守法律法规、规章、规范性文件及政策要求的规定，不得在雷铭O2O网或利用雷铭O2O网服务从事非法或其他损害雷铭O2O网或第三方权益的活动，如发送或接收任何违法、违规、违反公序良俗、侵犯他人权益的信息，发送或接收传销材料或存在其他危害的信息或言论，未经雷铭O2O网授权使用或伪造雷铭O2O网电子邮件题头信息等。</li>
                          <li><span>3.2.2.</span>用户应当遵守法律法规应当谨慎合理使用和妥善保管雷铭O2O网账号及密码，对其雷铭O2O网账号和密码下进行的行为和发生的事件负责。当用户发现雷铭O2O网账号被未经其授权的第三方使用或存在其他账号安全问题时应立即有效通知雷铭O2O网，要求雷铭O2O网暂停该雷铭O2O网账号的服务，并向公安机关报案。雷铭O2O网有权在合理时间内对用户的该等请求采取行动，但对采取行动前用户已经遭受的损失不承担任何责任。用户在未经雷铭O2O网同意的情况下不得将雷铭O2O网账号以赠与、借用、租用、转让或其他方式处分给他人。</li>
                          <li><span>3.2.3.</span>用户通过雷铭O2O网与商家进行团购交易时，应当遵守本协议“团购交易规则”的全部约定及雷铭O2O网发布的其他关于团购交易的服务条款和操作规则的全部规定。</li>
                          <li><span>3.2.4.</span>用户在雷铭O2O网对团购商品/服务进行评价时应当根据实际情况如实进行评价。</li>
                          <li><span>3.2.5.</span>用户应当按照雷铭O2O网发布的规则参加雷铭O2O网抽奖等活动，遵守活动秩序。</li>
                          <li><span>3.2.6.</span>雷铭O2O网发布的其他服务条款和操作规则。</li>
                      </ol>
                  </li>
              </ol>
              <h4>四、团购交易规则</h4>
              <p>用户承诺在其进入雷铭O2O网消费，通过雷铭O2O网与商家进行团购交易的过程中良好遵守如下雷铭O2O网团购交易规则。</p>
              <ol>
                  <li><span>4.1.</span>浏览团购信息
                      <p><strong>用户在雷铭O2O网浏览团购商品/服务的团购信息时，应当仔细阅读团购信息中包含的全部内容，包括但不限于团购商品/服务的名称、种类、数量、质量、价格、有效期、预约时间、商家地址、营业时间、配送方式、退换货方式、退款条件、售后服务等内容，其中用户应特别注意团购商品/服务的有效期、预约时间及退款条件等内容，用户完全接受团购信息中包含的全部内容后方可点击购买。</strong></p>
                  </li>
                  <li><span>4.2.</span>提交及确认团购订单
                      <ol>
                          <li><span>4.2.1.</span><strong>用户应当仔细阅读团购订单页面中所包含的全部内容，包括但不限于团购信息中的全部内容、为再次提示用户注意而标明的本单团购商品/服务的有效期、退款条件等内容（如有），选择及确认购买数量、价格、应付总额、用户接收团购电子消费凭证的联系方式或接收货物的收货地址和送货时间等内容。<br/>前述团购订单页面中所包含的全部内容，构成了用户与商家之间达成的团购合同的合同内容，用户完全同意团购订单的全部内容后方可提交订单。</strong></li>
                          <li><span>4.2.2.</span><strong>用户再次阅读并确认团购订单的全部内容后方可点击确认订单并付款，用户确认订单即视为用户已知晓、同意并接受团购订单中的全部内容，与商家成立了团购合同。团购订单中所包含的全部内容即为团购合同的内容，具体包括但不限于团购商品/服务的名称、种类、数量、质量、价格、有效期、预约时间、商家地址、营业时间、配送方式、退换货方式、退款条件、售后服务等，用户与商家均应当按照前述团购合同的约定履行各自的权利义务。</strong></li>
                      </ol>
                  </li>
                  <li><span>4.3.</span>支付团购价款
                      <p>在团购合同成立之后用户应根据付款页面的提示通过网上支付平台完成团购价款的支付。因雷铭O2O网接受商家委托代商家向用户收取团购价款，故用户将团购价款支付给雷铭O2O网且支付成功即视为用户已向商家履行了团购合同项下的团购价款支付义务。用户在支付团购价款之前不得要求商家向用户提供团购商品/服务。</p>
                  </li>
                  <li><span>4.4.</span>团购电子消费凭证
                      <ol>
                          <li><span>4.4.1.</span>用户支付团购价款成功后，雷铭O2O网向用户发送团购电子消费凭证，用户可按照团购合同的约定凭团购电子消费凭证向商家主张获得团购商品/服务。</li>
                          <li><span>4.4.2.</span>用户应当妥善保管团购电子消费凭证，因用户保管不善导致团购电子消费凭证被他人使用的，用户要求雷铭O2O网重新发送团购电子消费凭证的, 雷铭O2O有权拒绝提供。</li>
                          <li><span>4.4.3.</span>对于需要通过团购电子消费凭证验证进行消费的团购商品/服务，用户进行消费时，应向商家出示团购电子消费凭证，商家对团购电子消费凭证验证成功后按照团购合同内容的约定向用户提供团购商品/服务。</li>
                          <li><span>4.4.4.</span>团购电子消费凭证于发生以下情形之一时即失效：
                              <ol>
                                  <li><span>4.4.4.1.</span>凭团购电子消费凭证已获得团购商品/服务；</li>
                                  <li><span>4.4.4.2.</span>团购合同内容中约定的有效期届满。</li>
                              </ol>
                          </li>
                      </ol>
                  </li>
                  <li><span>4.5.</span>退款规则
                      <p>用户支付团购价款成功后，需要进行退款的，按照如下规则进行：</p>
                      <ol>
                          <li><span>4.5.1.</span>发生以下情形之一的，用户有权要求雷铭O2O网代商家进行退款：
                              <ol>
                                  <li><span>4.5.1.1.</span>因未达到最低团购人数，造成当次团购活动被取消的；</li>
                                  <li><span>4.5.1.2.</span>用户付款成功后，因不可抗力或商家原因，导致商家无法向用户提供团购商品/服务，经雷铭O2O网核实后属实的；</li>
                                  <li><span>4.5.1.3.</span>用户付款成功后，因确属情况变化导致商家需要变更团购合同内容，用户不接受变更后内容的。</li>
                              </ol>
                          </li>
                          <li><span>4.5.2.</span><strong> 如用户已实际消费团购商品/服务，又要求商家退款或要求雷铭O2O网代商家进行退款的，商家及/或雷铭O2O网有权拒绝提供。但团购商品/服务与团购合同约定内容严重不符、存在其他严重质量问题或违反《中华人民共和国食品安全法》、《中华人民共和国食品安全法实施条例》、《餐饮服务食品安全监督管理办法》、《中华人民共和国消费者权益保护法》等法律规定的情况除外。 </strong></li>
                          <li><span>4.5.3.</span><strong>团购合同约定的有效期届满但用户未在有效期内进行消费的，是否及如何退款应根据团购合同的约定确定。根据团购合同的约定用户有权要求退款的，用户应按照团购合同的约定要求雷铭O2O网代商家进行退款，在此种情况下如用户但未向雷铭O2O网要求退款的，即视为用户放弃了主张退款的权利，雷铭O2O网有权保留及处理此等款项。</strong></li>
                          <li><span>4.5.4.</span>
                              <strong>用户成功进行团购交易后，未凭团购电子消费凭证进行实际消费且符合雷铭O2O网关于“未消费随时退款”约定的，用户可以向雷铭O2O网申请退款。经雷铭O2O网审核，用户的退款申请符合“未消费随时退款”约定的，雷铭O2O网将于2个工作日内退款至用户的雷铭O2O网账户内；<br/>如用户申请将款项退回至用户的支付账户的，即用户申请提现的，则雷铭O2O网将于3-10个工作日内将款项按照用户的支付路径原路退回至用户的支付账户；如用户在30日内申请提现的总金额大于或等于人民币5000元，则属于大额提现，雷铭O2O网针对大额提现将于60日内将款项按照用户的支付路径原路退回至用户的支付账户。</strong>
                              <strong>但如下商品或服务除外：</strong>
                              <ol>
                                  <li><span>4.5.4.1.</span><strong>已消费且无充分证据证明商户提供的商品或服务存在瑕疵或与页面团购信息承诺不符的其他情形的雷铭O2O券；</strong></li>
                                  <li><span>4.5.4.2.</span><strong>实物类产品在用户按照雷铭O2O网规则提交退货申请，并退回货物前（需物流运送的产品）；</strong></li>
                                  <li><span>4.5.4.3.</span><strong>因非正常使用及保管而损坏的团购商品；</strong></li>
                                  <li><span>4.5.4.4.</span><strong>在雷铭O2O网中明确标明“不支持未消费随时退款”的产品或服务；</strong></li>
                              </ol>
                          </li>
                          <li><span>4.5.5.</span><strong>其他情形下的退款按照团购合同内容约定的退款条件及退款方式进行。</strong></li>
                          <li><span>4.5.6.</span><strong>在退款进行过程中，用户应当遵守雷铭O2O网关于退款的服务条款和操作规则的规定。</strong></li>
                      </ol>
                  </li>
                  <li><span>4.6.</span>团购争议解决规则
                      <p><strong>如用户与商家因团购合同的履行发生任何争议，包括但不限于对团购商品/服务的数量、质量、价格、有效期、预约时间、商家地址、配送方式、退换货方式、退款条件、售后服务等问题发生争议的，用户应与商家根据团购合同内容的约定确定用户与商家各自的权利义务，承担各自的责任，解决争议。雷铭O2O网可协助用户与商家之间争议的协商调解。</strong></p>
                  </li>
              </ol>
              <h4>五、用户的权利和义务</h4>
              <ol>
                  <li><span>5.1.</span>用户有权按照本协议约定接受雷铭O2O网提供的雷铭O2O网网络交易平台服务。</li>
                  <li><span>5.2.</span>用户有权在注册时选择是否订阅雷铭O2O网发送的关于团购信息的电子邮件或短消息，并在注册成功后有权随时订阅或退订雷铭O2O网该等信息。</li>
                  <li><span>5.3.</span><strong>如用户要求获得团购商品/服务的发票、其他付款凭证、购货凭证或服务单据，有权且应当在对团购商品/服务进行消费时向商家提出，发票金额以实际支付的团购价款为准。</strong></li>
                  <li><span>5.4.</span><strong>用户在消费团购商品/服务的过程中，如发现团购商品/服务与订单内容不符或存在质量、服务态度等其他问题的，应与商家采取协商或其他方式予以解决，雷铭O2O网可向用户提供商家的真实网站登记信息并积极协助用户与商家解决争议。</strong></li>
                  <li><span>5.5.</span>用户有权随时终止使用雷铭O2O网服务。</li>
                  <li><span>5.6.</span>用户应保证其在注册时和提交订单时所提供的姓名、联系方式、联系地址等全部信息真实、完整、准确，并当上述信息发生变更时及时进行更新提供给雷铭O2O网的信息。</li>
                  <li><span>5.7.</span>用户在雷铭O2O网进行团购交易时不得恶意干扰团购的正常进行、破坏雷铭O2O网团购秩序。</li>
                  <li><span>5.8.</span>用户不得以任何技术手段或其他方式干扰雷铭O2O网的正常运行或干扰其他用户对雷铭O2O网服务的使用。</li>
                  <li><span>5.9.</span>用户不得以虚构事实等方式恶意诋毁雷铭O2O网或商家的商誉。</li>
                  <li><span>5.10.</span>用户通过雷铭O2O网进行团购交易应出于真实消费目的，不得以转售等商业目的进行团购交易。</li>
                  <li><span>5.11.</span>用户在付款成功后应配合接收货物或团购电子消费凭证。</li>
                  <li><span>5.12.</span>用户不得对团购商品/服务进行虚假评价或虚假投诉。</li>
              </ol>
              <h4>六、雷铭O2O网的权利和义务</h4>
              <ol>
                  <li><span>6.1.</span>如用户不具备本协议约定的注册资格，则雷铭O2O网有权拒绝用户进行注册，对已注册的用户有权注销其雷铭O2O网会员账号，雷铭O2O网因此而遭受损失的有权向前述用户或其法定代理人主张赔偿。同时，雷铭O2O网保留其他任何情况下决定是否接受用户注册的权利。</li>
                  <li><span>6.2.</span>雷铭O2O网发现账户使用者并非账户初始注册人时，有权中止该账户的使用。</li>
                  <li><span>6.3.</span>雷铭O2O网通过技术检测、人工抽检等检测方式合理怀疑用户提供的信息错误、不实、失效或不完整时，有权通知用户更正、更新信息或中止、终止为其提供雷铭O2O网服务。</li>
                  <li><span>6.4.</span>雷铭O2O网有权在发现雷铭O2O网上显示的任何信息存在明显错误时，对信息予以更正。</li>
                  <li><span>6.5.</span><strong>用户付款成功前，雷铭O2O网有权接受商家委托对订单内容作出变更，如用户接受变更后的内容则用户可确认订单及付款，如用户不接受变更后内容则有权取消订单。用户付款成功后，如确因情况变化导致商家需对订单内容作出变更的，雷铭O2O网有权接受商家委托单方对订单内容作出变更，如用户接受变更则按变更后的订单内容进行消费，如用户不接受变更则用户有权取消订单并要求雷铭O2O网代商家全额退款。</strong></li>
                  <li><span>6.6.</span>雷铭O2O网保留修改、中止或终止雷铭O2O网服务的权利，雷铭O2O网行使前述权利将按照法律规定的程序及方式告知用户。</li>
                  <li><span>6.7.</span>雷铭O2O网应当采取必要的技术手段和管理措施保障雷铭O2O网的正常运行，并提供必要、可靠的交易环境和交易服务，维护团购交易秩序。</li>
                  <li><span>6.8.</span><strong>如用户连续一年未使用雷铭O2O网会员账号和密码登录雷铭O2O网，则雷铭O2O网有权注销用户的雷铭O2O网账号。账号注销后，雷铭O2O网有权将相应的会员名开放给其他用户注册使用。</strong></li>
                  <li><span>6.9.</span><strong>当一次团购活动中团购人数未达到最低团购人数要求时，雷铭O2O网有权取消本次团购活动，并根据本协议约定向已支付相应团购价款的用户进行退款。</strong></li>
                  <li><span>6.10.</span><strong>雷铭O2O网有权在本协议履行期间及本协议终止后保留用户的注册信息及用户应用雷铭O2O网服务期间的全部交易信息，但不得非法使用该等信息。</strong></li>
                  <li><span>6.11.</span>雷铭O2O网有权随时删除雷铭O2O网网站内各类不符合国家法律法规、规范性文件或雷铭O2O网网站规定的用户评价等内容信息，雷铭O2O网行使该等权利不需提前通知用户。</li>
              </ol>
        <h4>七、用户信息</h4>
            <ol>
          <li><span>7.1.</span><strong>在遵守法律的前提下，为向用户提供优质、便捷的服务，当用户注册雷铭O2O网账户时，或访问雷铭O2O网站及其相关网站、雷铭O2O网移动设备客户端时，或使用雷铭O2O网提供的服务时，雷铭O2O网可能会记录用户操作的相关信息或采集用户的以下信息：</strong>
          <ol>
            <li><span>7.1.1.</span><strong>在用注册雷铭O2O网账户及使用雷铭O2O网提供的各项服务时，为识别用户的身份，可能要向雷铭O2O网提供一些个人信息（包括但不限于姓名、身份证明、地址、电话号码、电子邮件地址等信息及相关附加信息（如您所在的省份和城市、邮政编码等））。</strong></li>
            <li><span>7.1.2.</span><strong>如用户使用的雷铭O2O网服务需与用户的银行账户或其他支付工具的账户关联方能实现时，用户需要向雷铭O2O网提供用户的银行账户信息或其他支付工具的账户信息。</strong></li>
            <li><span>7.1.3.</span><strong>为便于用户查询自己的交易状态或历史记录，雷铭O2O网会保存用户使用雷铭O2O网服务产生的交易信息。</strong></li>
            <li><span>7.1.4.</span><strong>为更好地识别用户的身份以充分保护用户的账户安全，当用户访问雷铭O2O网站及其相关网站、雷铭O2O网移动设备客户端时，或使用雷铭O2O网提供的服务时，雷铭O2O网可能会记录用户操作的相关信息，包括但不限于用户的计算机IP地址、设备标识符、硬件型号、操作系统版本、用户的位置以及与雷铭O2O网服务相关的日志信息。</strong></li>
            <li><span>7.1.5.</span><strong>除上述信息外，雷铭O2O网还可能为了提供服务及改进服务质量的合理需要而收集用户的其他信息，包括用户与雷铭O2O网的客户服务团队联系时用户提供的相关信息，用户参与问卷调查时向雷铭O2O网发送的问卷答复信息，以及用户与雷铭O2O网及雷铭O2O网关联公司互动时雷铭O2O网收集的相关信息。与此同时，为提高用户使用雷铭O2O网提供的服务的安全性，更准确地预防钓鱼网站欺诈和木马病毒，雷铭O2O网可能会通过了解一些用户的网络使用习惯、用户常用的软件信息等手段来判断用户账户的风险，并可能会记录一些雷铭O2O网认为有风险的URL。</strong></li>
          </ol> </li>
          <li><span>7.2.</span>为保障用户的信息安全，雷铭O2O网一直并将继续努力采取各种合理的物理、电子和管理方面的安全措施来保护用户信息，使用户的信息不会被泄漏、毁损或者丢失，包括但不限于信息加密存储、数据中心的访问控制。雷铭O2O网对可能接触到用户的信息的员工或外包人员也采取了严格管理，包括但不限于根据岗位的不同设置不同的权限，与员工签署保密协议等措施。</li>
          <li><span>7.3.</span>在遵守法律的前提下，为向用户提供服务及提升服务质量，雷铭O2O网会把用户的信息用于下列用途：
          <ol>
            <li><span>7.3.1.</span>向用户提供雷铭O2O网的各项服务及客户服务，并维护、改进这些服务。</li>
            <li><span>7.3.2.</span>比较信息的准确性，并与第三方进行验证。例如，将用户向雷铭O2O网提交的身份信息与身份验证的服务机构进行验证。</li>
            <li><span>7.3.3.</span>为使用户知晓自己使用雷铭O2O网服务的情况或了解雷铭O2O网的服务，向用户发送服务状态的通知、营销活动及其他商业性电子信息。</li>
            <li><span>7.3.4.</span>对雷铭O2O网用户的身份数据、交易信息等进行综合统计、分析或加工，并出于团购、奖励或为了让用户拥有更广泛的社交圈的需要而使用、共享或披露；例如雷铭O2O网可能会统计某个时间段注册雷铭O2O网账户的新用户，对这些新用户提供专享的优惠活动。</li>
            <li><span>7.3.5.</span>预防或禁止非法的活动。</li>
            <li><span>7.3.6.</span>经用户许可的其他用途。</li>
          </ol></li>
          <li><span>7.4.</span>Cookie的使用
          <ol>
            <li><span>7.4.1.</span>为使用户获得更轻松的访问体验，用户访问雷铭O2O网网站或使用雷铭O2O网提供的服务时，雷铭O2O网可能会通过小型数据文件识别用户的身份，帮用户省去重复输入注册信息的步骤，或者帮助判断用户的账户安全。这些数据文件可能是Cookie，Flash Cookie，或用户的浏览器或关联应用程序提供的其他本地存储（统称“Cookie”）。</li>
            <li><span>7.4.2.</span>请用户理解，雷铭O2O网的某些服务只能通过使用“Cookie”才可得到实现。如果用户的浏览器或浏览器附加服务允许，用户可以修改对Cookie的接受程度或者拒绝雷铭O2O网的Cookie，但这一举动在某些情况下可能会影响用户安全访问雷铭O2O网网站和使用雷铭O2O网提供的服务。</li>
          </ol></li>
        </ol>
              <h4>八、特别声明</h4>
              <ol>
                  <li><span>8.1.</span><strong>用户未通过雷铭O2O网与商家之间进行的交易不属于雷铭O2O网团购交易，雷铭O2O网对不属于雷铭O2O网团购交易的交易事项不承担任何责任，用户不得因其与商家之间因此类交易发生的任何争议投诉雷铭O2O网或要求雷铭O2O承担任何责任。不属于雷铭O2O网团购交易的情况具体包括：用户未在雷铭O2O网与商家成立订单；用户虽在雷铭O2O网与商家成立订单，但未通过雷铭O2O网而直接向商家支付价款。</strong></li>
                  <li><span>8.2.</span><strong>不论在何种情况下，雷铭O2O网对由于信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、政府行为、司法行政机关的命令、其他不可抗力或第三方的不作为而造成的不能服务或延迟服务不承担责任。</strong></li>
            <li><span>8.3.</span><strong>作弊、扰乱交易秩序的情况</strong>
            <ol>
              <li><span>8.3.1.</span>除活动规则另有规定外，每次活动中，每个用户只限参加一次活动（活动包括并不限于促销优惠、秒杀、抽奖等等），每个用户只能中奖一次。同一手机、同一联系方式、同一IP地址、同一雷铭O2O网账户、同一身份证件、同一银行卡号、同一收货地址、同一终端设备号或其他可以合理显示为同一用户的情形，均视为同一用户。</li>
              <li><span>8.3.2.</span><strong>活动期间，如发现有用户通过不正当手段（包括但不限于侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、恶意套现、刷信誉、批量注册、用机器注册雷铭O2O网账户、用机器模拟客户端）参加活动而有碍其他用户公平参加本次活动或有违反活动目的之行为，活动举办方有权取消其获奖资格或其因参加活动所获赠品或权益。如该作弊行为给活动举办方造成损失的，活动举办方保留追究赔偿的权利。</strong></li>
              <li><span>8.3.3.</span><strong>对于恶意进行注册，反复交易退款，侵害雷铭O2O实际经营交易的情况，雷铭O2O会停止服务、封停账号并追究责任。</strong></li>
            </ol></li>
              </ol>
              <h4>九、知识产权</h4>
              <ol>
                  <li><span>9.1.</span>雷铭O2O网所包含的全部智力成果包括但不限于数据库、网站设计、文字和图表、软件、照片、录像、音乐、声音及其前述组合，软件编译、相关源代码和软件 (包括小应用程序和脚本) 的知识产权权利均归雷铭O2O网所有。用户不得为商业目的复制、更改、拷贝、发送或使用前述任何材料或内容。</li>
                  <li><span>9.2.</span>雷铭O2O网名称中包含的所有权利 (包括商誉和商标) 均归雷铭O2O网所有。</li>
                  <li><span>9.3.</span>用户接受本协议即视为用户主动将其在雷铭O2O网发表的任何形式的信息的著作权，包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利无偿独家转让给雷铭O2O网所有，雷铭O2O网有权利就任何主体侵权单独提起诉讼并获得全部赔偿。本协议属于《中华人民共和国著作权法》第二十五条规定的书面协议，其效力及于用户在雷铭O2O网发布的任何受著作权法保护的作品内容，无论该内容形成于本协议签订前还是本协议签订后。</li>
                  <li><span>9.4.</span>用户在使用雷铭O2O网服务过程中不得非法使用或处分雷铭O2O网或他人的知识产权权利。用户不得将已发表于雷铭O2O网的信息以任何形式发布或授权其它网站（及媒体）使用。</li>
              </ol>
              <h4>十、客户服务</h4>
              <p>雷铭O2O网建立专业的客服团队，并建立完善的客户服务制度，从技术、人员和制度上保障用户提问及投诉渠道的畅通，为用户提供及时的疑难解答与投诉反馈。</p>
              <h4>十一、协议的变更和终止</h4>
              <ol>
                  <li><span>11.1.</span>协议的变更
                      <p><strong>雷铭O2O网有权对本协议内容或雷铭O2O网发布的其他服务条款及操作规则的内容进行变更，雷铭O2O网将按照法律规定的程序及方式发布公告。如用户继续使用雷铭O2O网提供的服务即视为用户同意该等内容变更，如用户不同意变更后的内容则用户有权注销雷铭O2O网账户、停止使用雷铭O2O网服务。 </strong></p>
                  </li>
                  <li><span>11.2.</span>协议的终止
                      <ol>
                          <li><span>11.2.1.</span>雷铭O2O网有权依据本协议约定注销用户的雷铭O2O网账号，本协议于账号注销之日终止。</li>
                          <li><span>11.2.2.</span><strong>雷铭O2O网有权终止全部雷铭O2O网服务，本协议于雷铭O2O网全部服务依法定程序及方式终止之日终止。</strong></li>
                          <li><span>11.2.3.</span>本协议终止后，用户不得要求雷铭O2O网继续向其提供任何服务或履行任何其他义务，包括但不限于要求雷铭O2O网为用户保留或向用户披露其原雷铭O2O网账号中的任何信息，向用户或第三方转发任何其未曾阅读或发送过的信息等。</li>
                          <li><span>11.2.4.</span>本协议的终止不影响守约方向违约方追究违约责任。</li>
                      </ol>
                  </li>
              </ol>
              <h4>十二、违约责任</h4>
              <ol>
                  <li><span>12.1.</span>雷铭O2O网或用户违反本协议的约定即构成违约，违约方应当向守约方承担违约责任。</li>
                  <li><span>12.2.</span>如用户违反本协议约定，以转售等商业目的进行团购交易，则雷铭O2O网有权代商家取消相关团购交易，并有权注销其雷铭O2O网账号，终止为其提供雷铭O2O网服务，如雷铭O2O网因此而遭受损失的，有权要求用户赔偿损失。</li>
                  <li><span>12.3.</span>如因用户提供的信息不真实、不完整或不准确给雷铭O2O网或商家造成损失的，雷铭O2O网有权要求用户对雷铭O2O网或对商家进行损失的赔偿。</li>
                  <li><span>12.4.</span>如因用户违反法律法规规定或本协议约定，在雷铭O2O网或利用雷铭O2O网服务从事非法活动的，雷铭O2O网有权立即终止继续对其提供雷铭O2O网服务，注销其账号，并要求其赔偿由此给雷铭O2O网造成的损失。</li>
                  <li><span>12.5.</span>如用户以技术手段干扰雷铭O2O网的运行或干扰其他用户对雷铭O2O网使用的，雷铭O2O网有权立即注销其雷铭O2O网账号，并有权要求其赔偿由此给雷铭O2O网造成的损失。</li>
                  <li><span>12.6.</span>如用户以虚构事实等方式恶意诋毁雷铭O2O网或商家的商誉，雷铭O2O网有权要求用户向雷铭O2O网或商家公开道歉，赔偿其给雷铭O2O网或商家造成的损失，并有权终止对其提供雷铭O2O网服务。</li>
              </ol>
              <h4>十三、争议解决</h4>
              <p><strong>用户与雷铭O2O网因本协议的履行发生争议的应通过友好协商解决，协商解决不成的，任一方有权将争议提交北京仲裁委员会依据该会仲裁规则进行仲裁。</strong></p>
              <h4>十四、协议生效</h4>
              <p>本协议于用户点击雷铭O2O网注册页面的同意注册并完成注册程序、获得雷铭O2O网账号和密码时生效，对雷铭O2O网和用户均具有约束力。</p>
        <p>本协议于2016年10月10日发布。</p>
          </div>
      </div>
    </div>
    );
  }
}
