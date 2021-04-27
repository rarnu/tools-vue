<template>
  <div class="yugioh-container">
    <Page>
      <template #default>
        <div class="yugioh-card" :class="cardClass" :style="cardStyle" ondragstart="return false">

          <div class="card-name" v-name-color="form.color">
            <CompressText :text="form.name" :fontLoading="fontLoading" :width="1030" :height="200" :specColor="form.redName" :language="form.language"></CompressText>
          </div>
          <div class="card-attribute">
            <el-image :src="attributeSrc"></el-image>
          </div>

          <div class="card-level" v-if="showLevel" :style="levelStyle">
            <el-image v-for="item in form.level" :src="baseImage('/level.png')"></el-image>
          </div>

          <div class="card-rank" v-if="showRank" :style="rankStyle">
            <el-image v-for="item in form.rank" :src="baseImage('/rank.png')"></el-image>
          </div>

          <div class="card-rank" v-if="showMinusLevel" :style="minusLevelStyle">
            <el-image v-for="item in form.level" :src="baseImage('/minus.png')"></el-image>
          </div>

          <div class="spell-trap-link" v-if="['spell','trap'].includes(form.type) && form.icon.startsWith('link-')">
            <span>{{ (form.language === 'as' || form.language === 'or') ? '' : form.language === 'en' ? '[' : '【' }}</span>
            <CompressText :text="spellTrapLinkName" :fontLoading="fontLoading"></CompressText>
            <el-image class="spell-trap-icon" v-if="['link-filed', 'link-quick-play', 'link-equip', 'link-continuous', 'link-ritual', 'link-counter'].includes(form.icon)" :src="baseImage(`/icon-${form.icon.replace('link-', '')}.png`)"></el-image>
            <span>{{ (form.language === 'as' || form.language === 'or') ? '' : form.language === 'en' ? ']' : '】' }}</span>
          </div>

          <div class="spell-trap" v-if="['spell','trap'].includes(form.type) && !form.icon.startsWith('link-')">
            <span>{{ (form.language === 'as' || form.language === 'or') ? '' : form.language === 'en' ? '[' : '【' }}</span>
            <CompressText :text="spellTrapName" :fontLoading="fontLoading"></CompressText>
            <el-image class="spell-trap-icon" v-if="['filed', 'quick-play', 'equip', 'continuous', 'ritual', 'counter'].includes(form.icon)" :src="baseImage(`/icon-${form.icon}.png`)"></el-image>
            <span>{{ (form.language === 'as' || form.language === 'or') ? '' : form.language === 'en' ? ']' : '】' }}</span>
          </div>

          <div class="card-image" v-if="form.image" :style="imageStyle">
            <el-image :src="form.image" :lazy="true">
              <template #placeholder>
                <div class="image-slot">
                  <i class="fal fa-spinner fa-pulse"></i>
                </div>
              </template>
              <template #error>
                <div class="image-slot">
                  <i class="fal fa-image"></i>
                </div>
              </template>
            </el-image>
          </div>

          <div class="card-mask" :style="maskStyle">
            <el-image v-if="form.type==='pendulum'" :src="baseImage('/card-mask-pendulum.png')" fit="cover"></el-image>
            <el-image v-else :src="baseImage('/card-mask.png')" fit="cover"></el-image>
          </div>

          <div class="left-pendulum" v-if="form.type==='pendulum'">
            <span v-if="form.pendulumScale >= 0">{{ form.pendulumScale }}</span>
            <span v-else-if="form.pendulumScale === -1">?</span>
          </div>

          <div class="right-pendulum" v-if="form.type==='pendulum'">
            <span v-if="form.pendulumScale >= 0">{{ form.pendulumScale }}</span>
            <span v-else-if="form.pendulumScale === -1">?</span>
          </div>

          <div class="pendulum-description" v-if="form.type==='pendulum'">
            <CompressText :text="form.pendulumDescription" :width="950" :height="230" :fontLoading="fontLoading"
                          :language="form.language" autoSizeElement=".pendulum-description"></CompressText>
          </div>

          <div class="card-package" :style="packageStyle">
            <span>{{ form.package }}</span>
          </div>

          <div class="link-arrow" v-if="(form.type==='monster'&&form.cardType==='link') || ((form.type === 'spell' || form.type === 'trap') && form.icon.startsWith('link-'))">
            <el-image :src="baseImage('/arrow-up-on.png')" style="top: 293px;left: 569px" v-show="form.arrowList.includes(1)"></el-image>
            <el-image :src="baseImage('/arrow-right-up-on.png')" style="top: 313px;left: 1141px" v-show="form.arrowList.includes(2)"></el-image>
            <el-image :src="baseImage('/arrow-right-on.png')" style="top: 774px;left: 1221px" v-show="form.arrowList.includes(3)"></el-image>
            <el-image :src="baseImage('/arrow-right-down-on.png')" style="top: 1347px;left: 1141px" v-show="form.arrowList.includes(4)"></el-image>
            <el-image :src="baseImage('/arrow-down-on.png')" style="top: 1427px;left: 569px" v-show="form.arrowList.includes(5)"></el-image>
            <el-image :src="baseImage('/arrow-left-down-on.png')" style="top: 1347px;left: 109px" v-show="form.arrowList.includes(6)"></el-image>
            <el-image :src="baseImage('/arrow-left-on.png')" style="top: 774px;left: 88px" v-show="form.arrowList.includes(7)"></el-image>
            <el-image :src="baseImage('/arrow-left-up-on.png')" style="top: 313px;left: 109px" v-show="form.arrowList.includes(8)"></el-image>
            <el-image :src="baseImage('/arrow-up-off.png')" style="top: 293px;left: 569px" v-show="!form.arrowList.includes(1)"></el-image>
            <el-image :src="baseImage('/arrow-right-up-off.png')" style="top: 313px;left: 1141px" v-show="!form.arrowList.includes(2)"></el-image>
            <el-image :src="baseImage('/arrow-right-off.png')" style="top: 774px;left: 1221px" v-show="!form.arrowList.includes(3)"></el-image>
            <el-image :src="baseImage('/arrow-right-down-off.png')" style="top: 1347px;left: 1141px" v-show="!form.arrowList.includes(4)"></el-image>
            <el-image :src="baseImage('/arrow-down-off.png')" style="top: 1427px;left: 569px" v-show="!form.arrowList.includes(5)"></el-image>
            <el-image :src="baseImage('/arrow-left-down-off.png')" style="top: 1347px;left: 109px" v-show="!form.arrowList.includes(6)"></el-image>
            <el-image :src="baseImage('/arrow-left-off.png')" style="top: 771px;left: 87px" v-show="!form.arrowList.includes(7)"></el-image>
            <el-image :src="baseImage('/arrow-left-up-off.png')" style="top: 313px;left: 109px" v-show="!form.arrowList.includes(8)"></el-image>
          </div>
          <div class="link-arrow" v-if="form.type === 'pendulum' && form.pendulumType === 'link-pendulum'">
            <el-image :src="baseImage('/arrow-p-board.png')" style="top: 320px; left:42px;"></el-image>
            <el-image :src="baseImage('/arrow-p-up.png')" style="top: 327px;left: 567px" v-show="form.arrowList.includes(1)"></el-image>
            <el-image :src="baseImage('/arrow-p-down.png')" style="top: 1240px;left: 567px" v-show="form.arrowList.includes(5)"></el-image>
            <el-image :src="baseImage('/arrow-p-left.png')" style="top: 715px;left: 54px" v-show="form.arrowList.includes(7)"></el-image>
            <el-image :src="baseImage('/arrow-p-right.png')" style="top: 715px;left: 1259px" v-show="form.arrowList.includes(3)"></el-image>
            <el-image :src="baseImage('/arrow-p-left-up.png')" style="top: 350px;left: 80px" v-show="form.arrowList.includes(8)"></el-image>
            <el-image :src="baseImage('/arrow-p-left-down.png')" style="top: 1180px;left: 80px" v-show="form.arrowList.includes(6)"></el-image>
            <el-image :src="baseImage('/arrow-p-right-up.png')" style="top: 350px;left: 1186px" v-show="form.arrowList.includes(2)"></el-image>
            <el-image :src="baseImage('/arrow-p-right-down.png')" style="top: 1180px;left: 1186px" v-show="form.arrowList.includes(4)"></el-image>
          </div>

          <div class="card-description" v-card-description>
            <div v-if="['monster','pendulum'].includes(form.type)" class="card-effect">
              <span>{{ (form.language === 'as' || form.language === 'or') ? '' : form.language === 'en' ? '[' : '【' }}</span>
              <CompressText :text="form.monsterType" :fontLoading="fontLoading"></CompressText>
              <span>{{ (form.language === 'as' || form.language === 'or') ? '' : form.language === 'en' ? ']' : '】' }}</span>
            </div>

            <div class="description-info" :style="descriptionStyle">
              <!-- 只有一行的情况，无论如何都全文本压缩 -->
              <div v-if="form.description.split('\n').length === 1">
                <CompressText :text="form.description" :width="1170" :height="300" :fontLoading="fontLoading"
                              :language="form.language" autoSizeElement=".card-description"></CompressText>
              </div>
              <div v-else>
                <template v-for="(item,index) in form.description.split('\n')">
                  <!-- 处理第一行 -->
                  <div v-if="index === 0">
                    <!-- 如果第一行压缩 -->
                    <div v-if="form.firstLineCompress">
                      <CompressText :text="item" :width="1170" :height="70" :fontLoading="fontLoading"></CompressText>
                    </div>
                    <!-- 否则按其他行一样处理 -->
                    <div v-else>
                      <CompressText :text="item" :fontLoading="fontLoading"></CompressText>
                    </div>
                  </div>
                  <!--中间行不压缩-->
                  <div v-if="index > 0 && index < (form.description.split('\n').length - 1)">
                    <CompressText :text="item" :fontLoading="fontLoading"></CompressText>
                  </div>
                  <!--最后一行压缩-->
                  <div v-if="index !== 0 && index === (form.description.split('\n').length - 1)" class="last-description">
                    <CompressText :text="item" :width="1170" :height="lastDescriptionHeight" :fontLoading="fontLoading"
                                  :language="form.language" autoSizeElement=".card-description"></CompressText>
                  </div>
                  <!--item为空提供换行-->
                  <br v-if="!item">
                </template>
              </div>
            </div>
          </div>

          <div class="atk-def-link">
            <el-image :src="baseImage('/atk-def.svg')"
                      v-if="(form.type==='monster'&&form.cardType!=='link')||(form.type==='pendulum' && form.pendulumType !== 'link-pendulum')"></el-image>
            <el-image :src="baseImage('/atk-link.svg')" v-if="(form.type==='monster'&&form.cardType==='link') || (form.type === 'pendulum' && form.pendulumType === 'link-pendulum')"></el-image>
          </div>

          <div class="card-atk" v-if="['monster','pendulum'].includes(form.type)">
            <span v-if="form.atk >= 10000">
              <CompressText :text="`${form.atk}`" :width="400" :height="61"></CompressText>
            </span>

            <span v-if="form.atk >= 0 && form.atk <= 9999">{{ form.atk }}</span>
            <span v-else-if="form.atk === -1">?</span>
            <span v-else-if="form.atk === -2"><span class="card-atk-infinate"><b>∞</b></span></span>
          </div>

          <div class="card-def" v-if="(form.type==='monster'&&form.cardType!=='link')||(form.type==='pendulum' && form.pendulumType !== 'link-pendulum')">
            <span v-if="form.def >= 0">{{ form.def }}</span>
            <span v-else-if="form.def === -1">?</span>
            <span v-else-if="form.atk === -2"><span class="card-def-infinate"><b>∞</b></span></span>
          </div>

          <div class="card-link" v-if="(form.type==='monster'&&form.cardType==='link') || (form.type === 'pendulum' && form.pendulumType === 'link-pendulum')">
            <span>{{ form.arrowList.length }}</span>
          </div>

          <div class="card-password" :style="passwordStyle">
            <span>{{ form.password }}</span>
          </div>

          <div class="card-copyright" v-if="form.copyright">
            <el-image :src="copyrightSrc"></el-image>
          </div>

          <div class="card-laser" v-if="form.laser">
            <el-image :src="baseImage('/laser.png')"></el-image>
          </div>

          <div class="card-flash-0" v-if="form.flash0">
            <el-image :src="baseImage('/flash_bg.png')"></el-image>
          </div>

          <div class="card-flash-0" v-if="form.flash1 && form.type !== 'pendulum'">
            <el-image :src="baseImage('/flash_effect.png')"></el-image>
          </div>

          <div class="card-flash-0">
            <el-image :src="baseImage(`/flash_${form.flash2}.png`)"></el-image>
          </div>

        </div>

      </template>

      <template #ydk>
        <div class="form-ydk">
          <el-form ref="form" label-width="auto" size="small">
            <el-form-item label="YDK">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-upload action="/" :show-file-list="false" accept="application/text" :before-upload="importYDK">
                    <el-button type="success">导入 YDK</el-button>
                  </el-upload>
                </el-col>
                <el-col :span="8">
                  <el-button type="success" @click="batchExportImage" :disabled="batchExporting">批量导出</el-button>
                </el-col>
                <el-col :span="8">
                  <el-button type="danger" @click="stopBatchExportImage" :disabled="!batchExporting">停止导出</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label-width="0px">
              <div v-for="(item) in ydkData">
                <div style=" width: 100%; height: 40px; line-height: 40px; border-bottom: 1px solid lightgray">
                  <div style="float: left; width: 10px"><span><b>{{ item.count }}</b></span></div>
                  <div style="float: left; width: 250px; height: 40px;">
                    <CompressText :text="item.name" :width="250" :height="40"></CompressText>
                  </div>
                  <div style="float: right; width: 32px; height: 40px;">
                    <el-button type="warning" v-if="!batchExporting" style="float: right; width: 32px; height: 32px; margin-top: 4px; padding: 0" @click.stop="showYdkCard(item.id);">显示</el-button>
                  </div>
                  <div style="float: right; margin-right: -32px; width: 40px; height: 40px; line-height: 40px; font-size: 12px; color: darkgray;" v-if="batchExporting && item.exported">
                    <span>已导出</span>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <template #form>
        <div class="form-main">
          <div class="font-loading" v-if="fontLoading">
            <i class="el-icon-loading"></i>
            <span>字体加载中...</span>
          </div>

          <el-form ref="form" :model="form" label-width="auto" size="small">
            <el-form-item label="文件">
              <el-row :gutter="10">
                <el-col :span="4">
                  <el-button type="primary" @click="newCard">新建</el-button>
                </el-col>
                <el-col :span="4">
                  <el-upload action="/" :show-file-list="false" accept="application/json" :before-upload="importJson">
                    <el-button type="primary">打开</el-button>
                  </el-upload>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" @click="exportJson">保存</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button type="warning" @click="aboutDialog = true">关于</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="卡图">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-button type="success" style="width: 100%" :loading="exportLoading" @click="exportImage">导出卡图</el-button>
                </el-col>
                <el-col :span="8">
                  <el-switch active-text="打印模式" v-model="printMode"></el-switch>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="form.language" placeholder="请选择语言" @change="changeLanguage">
                <el-option label="简体中文" value="sc"></el-option>
                <el-option label="繁体中文" value="tc"></el-option>
                <el-option label="日文" value="jp"></el-option>
                <el-option label="英文" value="en"></el-option>
                <el-option label="星光体" value="as"></el-option>
                <el-option label="奥利哈钢" value="or"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="卡名">
              <el-autocomplete v-model="form.name" :fetch-suggestions="fetchCardName" placeholder="请输入卡名" @select="selectCardName"></el-autocomplete>
            </el-form-item>
            <el-form-item label="注音">
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-button type="primary" :disabled="form.language !== 'jp' || !useKK" style="width: 100%" @click="remoteKana">远程注音</el-button>
                </el-col>
                <el-col :span="12">
                  <el-switch v-model="useKK" :disabled="form.language !== 'jp'" active-text="启用注音"></el-switch>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="颜色">
              <el-color-picker v-model="form.color"></el-color-picker>
              <span class="tip">（自动选择清空）</span>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="form.type">
                <el-radio-button label="monster">怪兽</el-radio-button>
                <el-radio-button label="spell">魔法</el-radio-button>
                <el-radio-button label="trap">陷阱</el-radio-button>
                <el-radio-button label="pendulum">灵摆</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="属性" v-if="['monster','pendulum'].includes(form.type)">
              <el-radio-group v-model="form.attribute">
                <el-radio-button label="dark">暗</el-radio-button>
                <el-radio-button label="light">光</el-radio-button>
                <el-radio-button label="earth">地</el-radio-button>
                <el-radio-button label="water">水</el-radio-button>
                <el-radio-button label="fire">炎</el-radio-button>
                <el-radio-button label="wind">风</el-radio-button>
                <el-radio-button label="divine">神</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图标" v-if="['spell','trap'].includes(form.type)">
              <el-select v-model="form.icon" placeholder="请选择图标" clearable>
                <el-option label="装备" value="equip"></el-option>
                <el-option label="场地" value="filed"></el-option>
                <el-option label="速攻" value="quick-play"></el-option>
                <el-option label="仪式" value="ritual"></el-option>
                <el-option label="永续" value="continuous"></el-option>
                <el-option label="反击" value="counter"></el-option>
                <el-option label="连接／通常" value="link-normal"></el-option>
                <el-option label="连接／装备" value="link-equip"></el-option>
                <el-option label="连接／场地" value="link-filed"></el-option>
                <el-option label="连接／速攻" value="link-quick-play"></el-option>
                <el-option label="连接／仪式" value="link-ritual"></el-option>
                <el-option label="连接／永续" value="link-continuous"></el-option>
                <el-option label="连接／反击" value="link-counter"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload style="display: inline-block" action="/" :show-file-list="false" accept="image/*" :before-upload="beforeUpload">
                <el-button type="primary">选择图片</el-button>
              </el-upload>
              <el-button style="margin-left: 10px" plain @click="deleteImage">删除</el-button>
            </el-form-item>
            <el-form-item label="卡类" v-if="form.type==='monster'">
              <el-select v-model="form.cardType" placeholder="请选择卡类">
                <el-option label="通常" value="normal"></el-option>
                <el-option label="效果" value="effect"></el-option>
                <el-option label="仪式" value="ritual"></el-option>
                <el-option label="融合" value="fusion"></el-option>
                <el-option label="同调" value="synchro"></el-option>
                <el-option label="黑暗同调" value="darksync"></el-option>
                <el-option label="超量" value="xyz"></el-option>
                <el-option label="连接" value="link"></el-option>
                <el-option label="衍生物" value="token"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="灵摆" v-if="form.type==='pendulum'">
              <el-select v-model="form.pendulumType" placeholder="请选择灵摆">
                <el-option label="通常／灵摆" value="normal-pendulum"></el-option>
                <el-option label="效果／灵摆" value="effect-pendulum"></el-option>
                <el-option label="仪式／灵摆" value="ritual-pendulum"></el-option>
                <el-option label="融合／灵摆" value="fusion-pendulum"></el-option>
                <el-option label="同调／灵摆" value="synchro-pendulum"></el-option>
                <el-option label="黑暗同调／灵摆" value="darksync-pendulum"></el-option>
                <el-option label="超量／灵摆" value="xyz-pendulum"></el-option>
                <el-option label="链接／灵摆" value="link-pendulum"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="星级" v-if="showLevel || showMinusLevel">
              <el-input-number v-model="form.level" :min="0" :max="13" :precision="0"></el-input-number>
            </el-form-item>
            <el-form-item label="阶级" v-if="showRank">
              <el-input-number v-model="form.rank" :min="0" :max="13" :precision="0"></el-input-number>
            </el-form-item>

            <el-form-item label="刻度" v-if="form.type==='pendulum'">
              <el-input-number v-model="form.pendulumScale" :min="-1" :max="13" :precision="0"></el-input-number>
              <span class="tip">（? 输入 -1）</span>
            </el-form-item>
            <el-form-item label="灵摆效果" label-width="40px" v-if="form.type==='pendulum'">
              <el-input type="textarea" :autosize="{minRows: 3}" v-model="form.pendulumDescription"
                        placeholder="请输入灵摆效果" @input="inputPendulumDescription"></el-input>
            </el-form-item>
            <el-form-item label="种族" v-if="['monster','pendulum'].includes(form.type)">
              <el-row :gutter="10">
                <el-col :span="20">
                  <el-input v-model="form.monsterType" placeholder="请输入种族"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" @click="raceDialog = true">输入</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="ATK" v-if="['monster','pendulum'].includes(form.type)">
              <el-input-number v-model="form.atk" :min="-2" :max="999999" :precision="0"></el-input-number>
              <span class="tip">（? 输入 -1）（∞ 输入 -2）</span>
            </el-form-item>
            <el-form-item label="DEF" v-if="(form.type==='monster'&&form.cardType!=='link')||form.type==='pendulum'">
              <el-input-number v-model="form.def" :min="-2" :max="999999" :precision="0"></el-input-number>
              <span class="tip">（? 输入 -1）（∞ 输入 -2）</span>
            </el-form-item>
            <el-form-item label="箭头" v-if="(form.type==='monster'&& form.cardType==='link') || (form.type === 'pendulum' && form.pendulumType === 'link-pendulum') || ((form.type === 'spell' || form.type === 'trap') && form.icon.startsWith('link-'))">
              <div class="arrow-form">
                <div class="arrow-item" v-for="item in [8,1,2,7,9,3,6,5,4]" @click="toggleArrow(item)" :style="arrowItemStyle(item)">
                  <i class="fas fa-arrow-alt-up" v-if="item===1"></i>
                  <i class="fas fa-arrow-alt-up" style="transform: rotate(45deg)" v-if="item===2"></i>
                  <i class="fas fa-arrow-alt-right" v-if="item===3"></i>
                  <i class="fas fa-arrow-alt-right" style="transform: rotate(45deg)" v-if="item===4"></i>
                  <i class="fas fa-arrow-alt-down" v-if="item===5"></i>
                  <i class="fas fa-arrow-alt-down" style="transform: rotate(45deg)" v-if="item===6"></i>
                  <i class="fas fa-arrow-alt-left" v-if="item===7"></i>
                  <i class="fas fa-arrow-alt-left" style="transform: rotate(45deg)" v-if="item===8"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="效果">
              <el-switch v-model="form.firstLineCompress" active-text="首行压缩(只有一行时无效)"></el-switch>
              <el-input type="textarea" :autosize="{minRows: 3}" v-model="form.description" placeholder="请输入效果"></el-input>
            </el-form-item>
            <el-form-item label="卡包">
              <el-input v-model="form.package" placeholder="请输入卡包"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <div style="display: flex">
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                <el-button style="margin-left: 10px" type="primary" :loading="searchLoading" @click="searchCardByPassword">搜索</el-button>
                <el-button type="primary" @click="randomPassword">随机</el-button>
              </div>
            </el-form-item>
            <el-form-item label="版权">
              <el-select v-model="form.copyright" placeholder="请选择版权" clearable>
                <el-option label="简体中文" value="sc"></el-option>
                <el-option label="日文" value="jp"></el-option>
                <el-option label="英文" value="en"></el-option>
              </el-select>
            </el-form-item>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="角标">
                  <el-switch v-model="form.laser"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="圆角">
                  <el-switch v-model="form.radius"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="卡背">
                  <el-switch v-model="form.cardBack"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="闪卡">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-switch v-model="form.flash0" active-text="背景闪" :disabled="printMode"></el-switch>&nbsp;&nbsp;
                </el-col>
                <el-col :span="8">
                  <el-switch v-model="form.flash1" active-text="效果框闪" :disabled="printMode"></el-switch>&nbsp;&nbsp;
                </el-col>
                <el-col :span="8">
                  <el-select v-model="form.redName">
                    <el-option label="无" value=""></el-option>
                    <el-option label="红碎" value="1"></el-option>
                    <el-option label="金字" value="2"></el-option>
                    <el-option label="银字" value="3"></el-option>
                    <el-option label="蓝碎" value="4"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="卡面">
              <el-radio-group v-model="form.flash2" :disabled="printMode">
                <el-radio-button label="0">0</el-radio-button>
                <el-radio-button label="1">1</el-radio-button>
                <el-radio-button label="2">2</el-radio-button>
                <el-radio-button label="3">3</el-radio-button>
                <el-radio-button label="4">4</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="缩放">
              <el-slider v-model="form.scale" :min="0.1" :max="1" :step="0.05"></el-slider>
            </el-form-item>
          </el-form>

          <div class="button-group">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-button plain size="medium" @click="effectDialog = true">效果输入</el-button>
              </el-col>
              <el-col :span="8">
                <el-button plain size="medium" @click="kanjiKanaDialog = true">一键注音</el-button>
              </el-col>
              <el-col :span="8">
                <el-button plain size="medium" :loading="randomLoading" @click="getRandomCard">随机生成</el-button>
              </el-col>
            </el-row>
          </div>
        </div>

        <KanjiKanaDialog v-model="kanjiKanaDialog"></KanjiKanaDialog>
        <RaceDialog v-model="raceDialog" :raceText="form.monsterType" :language="form.language" @transferRace="getRace"></RaceDialog>
        <EffectDialog v-model="effectDialog"></EffectDialog>
      </template>
    </Page>
  </div>
  <AboutDialog v-model="aboutDialog"></AboutDialog>
</template>

<script>
import Page from '@/components/page/Page';
import CompressText from '@/views/yugioh/components/CompressText';
import KanjiKanaDialog from '@/views/yugioh/components/KanjiKanaDialog';
import RaceDialog from "@/views/yugioh/components/RaceDialog";
import EffectDialog from "@/views/yugioh/components/EffectDialog";
import html2canvas from '@/assets/js/html2canvas';
import loadImage from 'blueimp-load-image';
import scDemo from './sc/sc-demo';
import tcDemo from './tc/tc-demo';
import jpDemo from './jp/jp-demo';
import enDemo from './en/en-demo';
import asDemo from './as/as-demo';
import orDemo from './or/or-demo';
import jpDataDemo from './jp/jp-data-demo';
import AboutDialog from '@/components/dialog/AboutDialog';
import ydk from "@/assets/js/ydk";
import sc2tc from "@/assets/js/sc2tc";

export default {

  name: 'Yugioh',
  components: {
    EffectDialog,
    Page,
    CompressText,
    KanjiKanaDialog,
    RaceDialog,
    AboutDialog
  },
  data() {
    return {
      aboutDialog: false,
      fontLoading: true,
      searchLoading: false,
      randomLoading: false,
      exportLoading: false,
      useKK: true,
      currentCardData: {},
      form: {
        language: 'jp',
        name: '',
        color: '',
        type: 'monster',
        attribute: 'dark',
        icon: '',
        image: '',
        cardType: 'normal',
        pendulumType: 'normal-pendulum',
        level: 0,
        rank: 0,
        pendulumScale: 0,
        pendulumDescription: '',
        monsterType: '',
        atk: 0,
        def: 0,
        arrowList: [],
        description: '',
        package: '',
        password: '',
        copyright: '',
        laser: false,
        radius: false,
        cardBack: false,
        scale: 0.5,
        firstLineCompress: false,
        flash0: false,
        flash1: false,
        flash2: 0,
        redName: ''
      },
      lastDescriptionHeight: 300,   // 最后一行效果压缩高度
      kanjiKanaDialog: false,
      raceDialog: false,
      effectDialog: false,
      ydkData: [],           // 读入 YDK 时填充
      printMode: false,      // 打印模式，将使用另一套卡模
      batchExporting: false, // 正在批量导出
      exportDirectory: ''    // 要导出的文件所在的目录
    };
  },
  created() {
    try {
      ipcRenderer.on('choose-directory-reply', (event, args) => {
        this.exportDirectory = args.path;
        if (this.exportDirectory === '') {
          // 如果返回的路径是空的，说明导出被取消
          this.batchExporting = false;
          return;
        }
        // 开始导出
        this.exportNextImage();
      });
    } catch (err) {

    }
    try {
      ipcRenderer.on('export-image-reply', (event, args) => {
        let id = args.id;
        for (let i = 0; i < this.ydkData.length; i++) {
          if (parseInt(this.ydkData[i].id) === parseInt(id) && !this.ydkData[i].exported) {
            // 一次只设置一张，会有多张导出的情况
            this.ydkData[i].exported = true;
            break;
          }
        }
        // 接到上一张图片导出完毕的消息，导出下一张图
        this.exportNextImage();
      });
    } catch (err) {

    }
    try {
      ipcRenderer.on('remote-kana-reply', (event, args) => {
        this.form.name = args.text;
      });
    } catch (e) {

    }
    Object.assign(this.currentCardData, jpDataDemo);
    Object.assign(this.form, jpDemo);
  },
  mounted() {
    window.assignCardData = this.assignCardData;
    document.fonts.ready.then(() => {
      this.fontLoading = false;
    });
  },
  methods: {
    remoteKana() {
      // 从远程服务器请求注音
      this.kanjiKanaAPI(this.cardName).then(kk => {
        if (kk) {
          this.form.name = kk;
        } else {
          this.form.name = this.kanjiToKana(this.cardName);
        }
      });
      if (this.form.cardType === 'normal' && this.form.pendulumType === 'normal-pendulum') {
        this.normalKanjiKanaAPI(this.form.description).then(kk => {
          if (kk) {
            this.form.description = kk;
          } else {
            this.form.description = this.kanjiToKana(this.form.description);
          }
        });
      } else {
        this.effectKanjiKanaAPI(this.form.description).then(kk => {
          if (kk) {
            this.form.description = kk;
          } else {
            this.form.description = this.kanjiToKana(this.form.description);
          }
        });
      }
      this.effectKanjiKanaAPI(this.form.pendulumDescription).then(kk => {
        if (kk) {
          this.form.pendulumDescription = kk;
        } else {
          this.form.pendulumDescription = this.kanjiToKana(this.form.pendulumDescription);
        }
      });
    },
    baseImage(path) {
      return require('@/assets/image' + path);
    },
    newCard() {
      Object.assign(this.form, jpDemo);
    },
    assignCardData(data) {
      Object.assign(this.form, data);
    },
    getRace(race) {
      // 从 Race 对话框回传过来的
      this.form.monsterType = race;
    },
    // 刷新字体
    refreshFont() {
      setTimeout(() => {
        this.fontLoading = true;
        document.fonts.ready.then(() => {
          this.fontLoading = false;
        });
      });
    },
    changeLanguage(value) {
      if (value === 'sc') {
        Object.assign(this.form, scDemo);
      } else if (value === 'tc') {
        Object.assign(this.form, tcDemo);
      } else if (value === 'jp') {
        Object.assign(this.currentCardData, jpDataDemo);
        Object.assign(this.form, jpDemo);
      } else if (value === 'en') {
        Object.assign(this.form, enDemo);
      } else if (value === 'as') {
        Object.assign(this.form, asDemo);
      } else if (value === 'or') {
        Object.assign(this.form, orDemo);
      }
      this.refreshFont();
    },
    beforeUpload(file) {
      let flag = file.type.includes('image');
      if (flag) {
        loadImage(file, {
          canvas: true,
          top: 0,
          aspectRatio: 1
        }).then(data => {
          this.form.image = data.image.toDataURL('image/png', 1);
        });
      } else {
        this.$message.warning('请选择正确图片格式');
      }
      return false;
    },
    deleteImage() {
      this.form.image = '';
    },
    inputPendulumDescription() {
      // 不保留换行符号
      if (this.form.pendulumDescription.includes('\n')) {
        this.$message.warning('不允许换行符');
        this.form.pendulumDescription = this.form.pendulumDescription.replace('\n', '');
      }
    },
    toggleArrow(item) {
      if (this.form.arrowList.includes(item)) {
        this.form.arrowList = this.form.arrowList.filter(value => value !== item);
      } else {
        this.form.arrowList.push(item);
      }
    },
    arrowItemStyle(item) {
      let border = '';
      let color = '';
      if (this.form.arrowList.includes(item)) {
        border = '1px solid darkorange';
        color = 'darkorange';
      }
      return {
        border: border,
        color: color,
        visibility: item === 9 ? 'hidden' : ''
      };
    },
    // 获取最后一行效果的压缩高度
    getLastDescriptionHeight() {
      let lastDescription = document.querySelector('.last-description');
      if (lastDescription) {
        if (['monster', 'pendulum'].includes(this.form.type)) {
          this.lastDescriptionHeight = 330 - lastDescription.offsetTop;
        } else {
          this.lastDescriptionHeight = 380 - lastDescription.offsetTop;
        }
      } else {
        this.lastDescriptionHeight = 0;
      }
    },
    fetchCardName(value, callback) {
      if (value) {
        this.axios({
          method: 'get',
          url: '/yugioh/card',
          params: {
            name: this.cardName,
            lang: this.form.language
          }
        }).then(res => {
          let data = res.data.data;
          data.forEach(value => {
            value.value = `${value.name}（${value.id}）`;
          });
          callback(data);
        });
      }
      callback([]);
    },
    selectCardName(value) {
      this.form.name = value.name;
      this.form.password = value.id;
      this.searchCardByPassword();
    },
    async parseData(data) {
      Object.assign(this.currentCardData, data);
      let cardInfo = await this.parseYugiohCard(data, this.form.language, this.useKK);
      Object.assign(this.form, cardInfo);
    },
    searchCardByPassword() {
      this.searchLoading = true;
      if (this.form.language === 'tc') {
        this.axios.get(`/yugioh/card/${this.form.password}?lang=tc`)
            .then(res => {
              this.parseData(res.data.data);
            })
            .catch(res => {
              // 繁中取不到的情况，取简中来翻译
              this.axios.get(`/yugioh/card/${this.form.password}?lang=sc`)
                  .then(res1 => {
                    let resConv = {};
                    Object.assign(resConv, res1.data.data);
                    resConv.name = sc2tc.simple2Traditional(res1.data.data.name);
                    resConv.desc = sc2tc.simple2Traditional(res1.data.data.desc);
                    this.parseData(resConv);
                  });
            }).finally(() => {
          this.searchLoading = false;
        });
      } else {
        this.axios({
          method: 'get',
          url: '/yugioh/card/' + this.form.password,
          params: {
            lang: this.form.language
          }
        }).then(res => {
          this.parseData(res.data.data);
        }).finally(() => {
          this.searchLoading = false;
        });
      }
    },
    randomPassword() {
      let rand = '';
      for (let i = 0; i < 8; i++) {
        rand += Math.floor(Math.random() * 10);
      }
      this.form.password = rand;
    },
    async getRandomCard() {
      this.randomLoading = true;
      let res = await this.axios({
        method: 'get',
        url: '/yugioh/random-card',
        params: {
          lang: this.form.language
        }
      });
      Object.assign(this.currentCardData, res.data.data);
      let cardInfo = await this.parseYugiohCard(res.data.data, this.form.language, this.useKK);
      Object.assign(this.form, cardInfo);
      this.randomLoading = false;
    },
    importJson(file) {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e => {
        try {
          let data = JSON.parse(e.target?.result);
          this.form = Object.assign(this.form, data);
          // 字体可能加载
          this.refreshFont();
        } catch (e) {
          this.$message.error('数据导入失败');
        }
      });
      return false;
    },
    importYDK(file) {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e => {
        try {
          let cardList = e.target?.result?.split('\n').filter(e => !e.startsWith('#') && !e.startsWith('!') && e.trim() !== '');
          ydk.getCardNameList(cardList, this.form.language, (list) => {
            this.ydkData = list;
          });
        } catch (e) {
          this.$message.error('导入 YDK 失败');
        }
      });
      return false;
    },
    showYdkCard(id) {
      this.form.password = id;
      this.searchCardByPassword();
    },
    exportJson() {
      let data = JSON.stringify(this.form);
      let blob = new Blob([data], {type: 'application/json'});
      this.downloadBlob(blob, this.cardName);
    },
    exportImage() {
      this.exportLoading = true;
      let element = document.querySelector('.yugioh-card');
      html2canvas(element, {
        useCORS: true,
        backgroundColor: 'transparent',
        width: this.form.scale * 1393,
        height: this.form.scale * 2031,
      }).then(canvas => {
        let dataURL = canvas.toDataURL('image/png', 1);
        let blob = this.dataURLtoBlob(dataURL);
        this.downloadBlob(blob, this.cardName);
      }).finally(() => {
        this.exportLoading = false;
      });
    },
    batchExportImage() {
      this.batchExporting = true;
      try {
        // 批量导出前，选择保存目录
        ipcRenderer.send('choose-directory', {});
      } catch (e) {
      }
    },
    stopBatchExportImage() {
      this.batchExporting = false;
    },
    exportNextImage() {
      if (!this.batchExporting) return;
      if (this.batchExporting) {
        // 是否要继续导出，导出是可以终止的
        let allExported = true;
        let exportId = '';
        for (let i = 0; i < this.ydkData.length; i++) {
          if (!this.ydkData[i].exported) {
            allExported = false;
            exportId = this.ydkData[i].id;
            break;
          }
        }
        if (!allExported) {
          // 加载下一张图
          this.form.password = exportId;
          this.searchCardByPassword();
        } else {
          // 全部导完了
          this.batchExporting = false;
        }
      }
    }
  },
  computed: {
    cardClass() {
      return `${this.form.language}-class ${this.form.cardBack ? 'card-back' : ''}`;
    },
    cardStyle() {
      let background;
      let cp = this.printMode ? 'pcard' : 'card';
      if (this.form.cardBack) {
        let u = this.baseImage('/card-back.png');
        background = `url(${u}) no-repeat center/cover`;
      } else if (this.form.type === 'monster') {
        let u = this.baseImage(`/${cp}-${this.form.cardType}.png`);
        background = `url(${u}) no-repeat center/cover`;
      } else if (this.form.type === 'pendulum') {
        let u = this.baseImage(`/${cp}-${this.form.pendulumType}.png`);
        background = `url(${u}) no-repeat center/cover`;
      } else {
        let u = this.baseImage(`/${cp}-${this.form.type}.png`);
        background = `url(${u}) no-repeat center/cover`;
      }
      return {
        transform: `scale(${this.form.scale})`,
        background: background,
        borderRadius: this.form.radius ? '24px' : '',
        marginRight: `${(this.form.scale - 1) * 1393}px`,
        marginBottom: `${(this.form.scale - 1) * 2031}px`
      };
    },
    attributeSrc() {
      let suffix = '';
      if (this.form.language === 'jp') {
        suffix = '-jp';
      } else if (this.form.language === 'en') {
        suffix = '-en';
      }
      if (['monster', 'pendulum'].includes(this.form.type)) {
        let u = this.baseImage(`/attribute-${this.form.attribute}${suffix}.png`);
        return u;
      } else {
        let u = this.baseImage(`/attribute-${this.form.type}${suffix}.png`);
        return u;
      }
    },
    spellTrapName() {
      let name = '';
      if (this.form.language === 'sc') {
        if (this.form.type === 'spell') {
          name = '魔法卡';
        } else if (this.form.type === 'trap') {
          name = '陷阱卡';
        }
      } else if (this.form.language === 'tc') {
        if (this.form.type === 'spell') {
          name = '魔法卡';
        } else if (this.form.type === 'trap') {
          name = '陷阱卡';
        }
      } else if (this.form.language === 'jp') {
        if (this.form.type === 'spell') {
          name = '[魔(ま)][法(ほう)]カード';
        } else if (this.form.type === 'trap') {
          name = '[罠(トラップ)]カード';
        }
      } else if (this.form.language === 'en') {
        if (this.form.type === 'spell') {
          name = 'Spell Card';
        } else if (this.form.type === 'trap') {
          name = 'Trap Card';
        }
      } else if (this.form.language === 'or') {
        if (this.form.type === 'spell') {
          name = 'fundsthc';
        } else if (this.form.type === 'trap') {
          name = 'fundgrun';
        }
      }
      return name;
    },
    spellTrapLinkName() {
      let name = '';
      if (this.form.language === 'sc') {
        name = '链接';
      } else if (this.form.language === 'tc') {
        name = '鏈接';
      } else if (this.form.language === 'jp' || this.form.language === 'as') {
        name = 'リンク';
      } else if (this.form.language === 'en') {
        name = 'Link';
      } else if (this.form.language === 'or') {
        name = 'LINK';
      }
      return name;
    },
    showLevel() {
      let flag = false;
      if (this.form.type === 'monster') {
        flag = ['normal', 'effect', 'ritual', 'fusion', 'synchro', 'token'].includes(this.form.cardType);
      } else if (this.form.type === 'pendulum') {
        flag = ['normal-pendulum', 'effect-pendulum', 'ritual-pendulum', 'fusion-pendulum', 'synchro-pendulum'].includes(this.form.pendulumType);
      }
      return flag;
    },
    showRank() {
      let flag = false;
      if (this.form.type === 'monster') {
        flag = this.form.cardType === 'xyz';
      } else if (this.form.type === 'pendulum') {
        flag = this.form.pendulumType === 'xyz-pendulum';
      }
      return flag;
    },
    showMinusLevel() {
      let flag = false;
      if (this.form.type === 'monster') {
        flag = this.form.cardType === 'darksync';
      } else if (this.form.type === 'pendulum') {
        flag = this.form.pendulumType === 'darksync-pendulum';
      }
      return flag;
    },
    levelStyle() {
      let right;
      if (this.form.level < 13) {
        right = '146px'
      } else {
        right = '100px'
      }
      return {
        right: right
      }
    },
    rankStyle() {
      let left;
      if (this.form.rank < 13) {
        left = '147px'
      } else {
        left = '100px'
      }
      return {
        left: left
      }
    },
    minusLevelStyle() {
      let left;
      if (this.form.level < 13) {
        left = '147px';
      } else {
        left = '100px';
      }
      return {
        left: left
      }
    },
    imageStyle() {
      let left, top, width, height;
      if (this.form.type === 'pendulum') {
        left = '94px';
        top = '365px';
        width = '1206px';
        height = '1204px';
      } else {
        left = '171px';
        top = '373px';
        width = '1053px';
        height = '1053px';
      }
      return {
        left: left,
        top: top,
        width: width,
        height: height
      };
    },
    maskStyle() {
      let left, top;
      if (this.form.type === 'pendulum') {
        left = '81px';
        top = '1254px';
      } else {
        left = '168px';
        top = '373px';
      }
      return {
        left: left,
        top: top
      };
    },
    packageStyle() {
      let top, left, right;
      if (this.form.type === 'pendulum') {
        top = '1854px';
        left = '116px';
      } else if (this.form.type === 'monster' && this.form.cardType === 'link') {
        top = '1455px';
        right = '252px';
      } else if ((this.form.type === 'spell' || this.form.type === 'trap') && this.form.icon.startsWith('link-')) {
        top = '1455px';
        right = '252px';
      } else {
        top = '1455px';
        right = '148px';
      }
      return {
        color: this.form.type === 'monster' && (this.form.cardType === 'xyz') ? 'white' : 'black',
        top: top,
        left: left,
        right: right
      };
    },
    descriptionStyle() {
      let fontFamily;
      if (this.form.language === 'en') {
        if ((this.form.type === 'monster' && this.form.cardType === 'normal') || (this.form.type === 'pendulum' && this.form.pendulumType === 'normal-pendulum')) {
          fontFamily = 'ygo-en-italic';
        }
      }
      return {
        fontFamily: fontFamily
      };
    },
    passwordStyle() {
      return {
        color: this.form.type === 'monster' && this.form.cardType === 'xyz' ? 'white' : 'black'
      };
    },
    copyrightSrc() {
      let color = this.form.type === 'monster' && this.form.cardType === 'xyz' ? 'white' : 'black';
      return this.baseImage(`/copyright-${this.form.copyright}-${color}.svg`);
    },
    cardName() {
      return this.form.name.replace(/\[(.*?)\(.*?\)]/g, '$1');
    }
  },
  directives: {
    nameColor(el, binding) {
      let that = binding.instance;
      // 文本和注音颜色分开控制
      let color = 'black';
      // 自动颜色
      if ((that.form.type === 'monster' && ['xyz', 'link', 'darksync'].includes(that.form.cardType)) || ['spell', 'trap'].includes(that.form.type) ||
          (that.form.type === 'pendulum' && ['xyz-pendulum', 'link-pendulum', 'darksync-pendulum'].includes(that.form.pendulumType))) {
        color = 'white';
      }
      el.style.color = binding.value || color;
      let rtList = el.querySelectorAll('.rt');
      rtList.forEach(rt => {
        rt.style.color = color;
      });
    },
    cardDescription(el, binding) {
      let that = binding.instance;
      that.getLastDescriptionHeight();
    }
  },
  watch: {
    'form.package'() {
      if (this.form.language === 'jp') {
        this.form.package = this.form.package.replace('-EN', '-JP').replace('-SC', '-JP').replace('-TC', '-JP');
      } else if (this.form.language === 'sc') {
        this.form.package = this.form.package.replace('-EN', '-SC').replace('-JP', '-SC').replace('-TC', '-SC');
      } else if (this.form.language === 'tc') {
        this.form.package = this.form.package.replace('-EN', '-TC').replace('-SC', '-TC').replace('-JP', '-TC');
      } else if (this.form.language === 'en') {
        this.form.package = this.form.package.replace('-JP', '-EN').replace('-SC', '-EN').replace('-TC', '-EN');
      }
    },
    // 图片转base64
    'form.image'() {
      if (this.form.image && !this.form.image.startsWith('data:image')) {
        loadImage(this.form.image, {
          canvas: true,
          top: 0,
          aspectRatio: 1,
          crossOrigin: 'Anonymous'
        }).then(data => {
          this.form.image = data.image.toDataURL('image/png', 1);
          let count = 1;
          for (let i = 0; i < this.ydkData.length; i++) {
            if (parseInt(this.ydkData[i].id) === parseInt(this.form.password)) {
              count = this.ydkData[i].count;
              break;
            }
          }
          setTimeout(() => {
            if (this.batchExporting) {
              // 如果正在批量导出，就导出卡图
              let element = document.querySelector('.yugioh-card');
              html2canvas(element, {
                useCORS: true,
                backgroundColor: 'transparent',
                width: this.form.scale * 1393,
                height: this.form.scale * 2031,
              }).then(canvas => {
                let dataURL = canvas.toDataURL('image/png', 1);
                try {
                  ipcRenderer.send('export-image', {path: this.exportDirectory, name: this.cardName, b64: dataURL, id: this.form.password, count: count});
                } catch (e) {
                }
              }).finally(() => {
                this.exportLoading = false;
              });
            }
          }, 3000);
        });
      }
    },
    'printMode'() {
      if (this.printMode) {
        this.form.flash0 = false;
        this.form.flash1 = false;
        this.form.flash2 = 0;
        this.form.laser = false;
        this.form.radius = false;
      }
    },
    'useKK'() {
      this.parseYugiohCard(this.currentCardData, this.form.language, this.useKK).then(cardInfo => {
        Object.assign(this.form, cardInfo);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./sc/sc";
@import "./tc/tc";
@import "./jp/jp";
@import "./en/en";
@import "./as/as";
@import "./or/or";

.yugioh-container {

  .yugioh-card {
    width: 1393px;
    height: 2031px;
    display: inline-flex;
    flex-wrap: wrap;
    vertical-align: top;
    position: relative;
    user-select: none;
    color: black;
    transform-origin: 0 0;
    overflow: hidden;

    .card-name {
      position: absolute;
      left: 116px;
      width: 1030px;
      max-height: 130px;

      ::v-deep(.ruby) {
        .rt {
          font-size: 18px;
          top: 3px;
        }
      }
    }

    .card-attribute {
      position: absolute;
      left: 1159px;
      top: 96px;
    }

    .card-level {
      position: absolute;
      top: 250px;

      .el-image {
        margin-left: 3px;
      }
    }

    .card-rank {
      position: absolute;
      top: 250px;

      .el-image {
        margin-right: 3px;
      }
    }

    .spell-trap-link {
      position: absolute;
      display: flex;
      align-items: center;

      ::v-deep(.ruby) {
        .rt {
          font-size: 18px;
          top: -2px;
        }
      }

      .el-image {
        display: flex;
        min-width: 72px;
      }
    }

    .spell-trap {
      position: absolute;
      display: flex;
      align-items: center;

      ::v-deep(.ruby) {
        .rt {
          font-size: 18px;
          top: -2px;
        }
      }

      .el-image {
        display: flex;
        min-width: 72px;
      }
    }

    .card-image {
      position: absolute;

      .el-image {
        width: 100%;
        height: 100%;

        .image-slot {
          display: flex;
          height: 100%;
          width: 100%;
          justify-content: center;
          align-items: center;
          font-size: 120px;
          color: $normal-color;
        }
      }
    }

    .card-mask {
      position: absolute;
      z-index: 10;
    }

    .left-pendulum {
      position: absolute;
      top: 1379px;
      left: 93px;
      width: 95px;
      font-family: ygo-atk-def, serif;
      font-size: 98px;
      text-align: center;
      letter-spacing: -10px;
      z-index: 20;
    }

    .right-pendulum {
      position: absolute;
      top: 1379px;
      right: 104px;
      width: 95px;
      font-family: ygo-atk-def, serif;
      font-size: 98px;
      text-align: center;
      letter-spacing: -10px;
      z-index: 20;
    }

    .pendulum-description {
      position: absolute;
      left: 221px;
      width: 950px;
      text-align: justify;
      z-index: 20;

      ::v-deep(.ruby) {
        .rt {
          font-size: 12px;
          top: -5px;
        }
      }
    }

    .card-package {
      position: absolute;
      font-family: ygo-password, serif;
      font-size: 40px;
      z-index: 20;
    }

    .link-arrow {
      .el-image {
        position: absolute;
        z-index: 20;
      }
    }

    .card-description {
      position: absolute;
      left: 109px;
      width: 1170px;
      text-align: justify;
      z-index: 20;

      .card-effect {
        white-space: nowrap;

        ::v-deep(.ruby) {
          .rt {
            font-size: 14px;
            top: -3px;
          }
        }
      }

      .description-info {
        ::v-deep(.ruby) {
          .rt {
            font-size: 12px;
            top: -5px;
          }
        }
      }
    }

    .atk-def-link {
      position: absolute;
      left: 109px;
      top: 1844px;
      z-index: 20;
    }

    .card-atk {
      position: absolute;
      right: 395px;
      top: 1845px;
      font-family: ygo-atk-def, serif;
      font-size: 61px;
      letter-spacing: 2px;
      z-index: 20;
    }

    .card-atk-infinate {
      position: absolute;
      right: 48px;
      top: -5px;
      font-family: ygo-jp, 楷体, serif;
      font-size: 61px;
    }


    .card-def {
      position: absolute;
      right: 124px;
      top: 1845px;
      font-family: ygo-atk-def, serif;
      font-size: 61px;
      letter-spacing: 2px;
      z-index: 20;
    }

    .card-def-infinate {
      position: absolute;
      right: 48px;
      top: -5px;
      font-family: ygo-jp, 楷体, serif;
      font-size: 61px;
    }


    .card-link {
      position: absolute;
      right: 116px;
      top: 1846px;
      font-family: ygo-link, serif;
      font-size: 54px;
      letter-spacing: 2px;
      z-index: 20;
    }

    .card-password {
      position: absolute;
      left: 66px;
      top: 1929px;
      font-family: ygo-password, serif;
      font-size: 40px;
      z-index: 20;
    }

    .card-copyright {
      position: absolute;
      top: 1936px;
      right: 141px;
      z-index: 20;
    }

    .card-laser {
      position: absolute;
      left: 1276px;
      top: 1913px;
      z-index: 20;
    }

    .card-flash-0 {
      position: absolute;
      top: 0;
      left: 0;
    }

    &.card-back {
      * {
        display: none;
      }
    }
  }

  .form-ydk {

  }

  .form-main {
    .font-loading {
      display: flex;
      align-items: center;
      color: $primary-color;
      margin-bottom: 20px;

      i {
        margin-right: 10px;
        font-size: 18px;
      }
    }

    .arrow-form {
      width: 130px;
      display: flex;
      flex-wrap: wrap;
      margin-right: -10px;
      margin-bottom: -10px;

      .arrow-item {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid $border-color;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: $placeholder-color;
        font-size: 18px;
      }
    }

    .button-group {
      .el-row {
        margin-top: -20px;

        .el-col {
          margin-top: 20px;

          ::v-deep(.el-upload) {
            width: 100%;
          }

          .el-button {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
