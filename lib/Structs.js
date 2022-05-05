const utils = require("./utils");

class Statistics {
    constructor(data) {
        /** 全服排名
         *  @type {number} */
        this.global_rank = data?.global_rank;
        /** 本地排名
         *  @type {number} */
        this.country_rank = data?.rank?.country;
        // sb服的grade_counts数值不正确
        /** acc，范围0-100
         *  @type {number} */
        this.hit_accuracy = data?.hit_accuracy;
        /** 等级
         *  @type {number} */
        this.level_current = data?.level?.current;
        /** 等级进度，范围0-100
         *  @type {number} */
        this.level_progress = data?.level?.progress;
        /** 最大combo
         *  @type {number} */
        this.maximum_combo = data?.maximum_combo;
        /** 游玩次数
         *  @type {number} */
        this.play_count = data?.play_count;
        /** 游玩时长（秒）
         *  @type {number} */
        this.play_time = data?.play_time;
        /** pp
         *  @type {number} */
        this.pp = data?.pp;
        /** Ranked 谱面总分
         *  @type {number} */
        this.ranked_score = data?.ranked_score;
        // sb服的total_hits数值不正确
        /** 总分
         *  @type {number} */
        this.total_score = data?.total_score;
    }

    toString() {
        let output = "";
        output += "PP： #" + utils.format_number(this.pp) + "\n";
        output += "全服排名： #" + utils.format_number(this.global_rank) + "\n";
        output += "本地排名： #" + utils.format_number(this.country_rank) + "\n";
        output += "Acc： " + this.hit_accuracy.toFixed(3) + "%" + "\n";
        output += "最大combo： " + utils.format_number(this.maximum_combo) + "\n";
        output += "游玩次数： " + utils.format_number(this.play_count) + "\n";
        output += "游玩时长： " + utils.getUserTimePlayed(this.play_time) + "\n";
        output += "Ranked 谱面总分： " + utils.format_number(this.ranked_score) + "\n";
        output += "等级： Lv." + this.level_current + " (" + this.level_progress + "%)" + "\n";
        return output;
    }
}

class Beatmap {
    constructor(data) {
        // 为了保证官服私服通用，仅保留服务器共有的参数
        /** 谱面集id
         *  @type {number} */
        this.beatmapset_id = data?.beatmapset_id;
        /** 谱面id
         *  @type {number} */
        this.id = data?.id;
        /** 难度名
         *  @type {number} */
        this.version = data?.version;
    }

    toString() {
        let output = "";
        output += "谱面setid： " + this.beatmapset_id + "\n";
        output += "谱面id： " + this.id + "\n";
        output += "难度名 " + this.version + "\n";
        return output;
    }
}

class BeatmapSet {
    constructor(data) {
        // 为了保证官服私服通用，仅保留服务器共有的参数
        /** 艺术家
         *  @type {string} */
        this.artist = data?.artist;
        /** 艺术家_unicode
         *  @type {string} */
        this.artist_unicode = data?.artist_unicode;
        /** 背景图url
         *  @type {{"card": string, "card@2x": string, "cover": string, "cover@2x": string, "list": string, "list@2x": string, "slimcover": string, "slimcover@2x": string}} */
        this.covers = data?.covers;
        /** 谱师
         *  @type {string} */
        this.creator = data?.creator;
        /** 标题
         *  @type {string} */
        this.title = data?.title;
        /** 标题_unicode
         *  @type {string} */
        this.title_unicode = data?.title_unicode;
    }

    toString() {
        let output = "";
        output += "曲目： " + this.artist_unicode + " - " + this.title_unicode + "\n";
        output += "上传者： " + this.creator + "\n";
        return output;
    }
}

class Score {
    constructor(data) {
        /** acc，**范围0-1**
         *  @type {number} */
        this.accuracy = data?.accuracy;
        /** 谱面数据
         *  @type {Beatmap} */
        this.beatmap = new Beatmap(data?.beatmap);
        /** 谱面集数据
         *  @type {BeatmapSet} */
        this.beatmapset = new BeatmapSet(data?.beatmapset);
        /** 最好成绩id
         *  @type {number} */
        this.best_id = data?.best_id;
        /** 日期
         *  @type {Date} */
        this.created_at = new Date(data?.created_at);
        /** 成绩id
         *  @type {number} */
        this.id = data?.id;
        /** combo数
         *  @type {number} */
        this.max_combo = data?.max_combo;
        /** mode
         *  @type {string} */
        this.mode = data?.mode;
        /** mode_int，sb服也只有0-3，不单独分离特殊模式
         *  @type {number} */
        this.mode_int = data?.mode_int;
        /** mods
         *  @type {Array<string>} */
        this.mods = data?.mods;
        /** passed
         *  @type {boolean} */
        this.passed = data?.passed;
        /** perfect
         *  @type {boolean} */
        this.perfect = data?.perfect;
        /** pp
         *  @type {number} */
        this.pp = data?.pp;
        /** rank，注意sb服用"SS"/"SSH"，官服用"X"/"XH"
         *  @type {string} */
        this.rank = data?.rank;
        /** 有replay
         *  @type {boolean} */
        this.replay = data?.replay;
        /** score
         *  @type {number} */
        this.score = data?.score;
        /** 击打数据
         *  @type {{count_50: number, count_100: number, count_300: number, count_geki: number, count_katu: number, count_miss: number}} */
        this.statistics = data?.statistics;
        /** 玩家数据，Score Api不包含这一项
         *  @type {User} */
        this.user = new User(data?.user);
        /** 玩家id
         *  @type {number} */
        this.user_id = data?.user_id;
        /** **best专有**，权重和加权后的pp
         *  @type {{percentage: number, pp: number}} */
        this.weight = data?.weight;
    }

    getBeatmapTitle() {
        let output = this.beatmap.id + " "
            + this.beatmapset.artist_unicode + " - "
            + this.beatmapset.title_unicode + "("
            + this.beatmapset.creator + ")["
            + this.beatmap.version + "]";
        return output;
    }

    getStatisticsString() {
        let counts = [];
        if (this.mode_int === 0) {// std
            if (this.statistics.count_300 > 0) counts.push(" " + this.statistics.count_300 + "x 300 ");
            if (this.statistics.count_100 > 0) counts.push(" " + this.statistics.count_100 + "x 100 ");
            if (this.statistics.count_50 > 0) counts.push(" " + this.statistics.count_50 + "x 50 ");
            if (this.statistics.count_miss > 0) counts.push(" " + this.statistics.count_miss + "x miss ");
        }
        else if (this.mode_int === 1) {// taiko
            if (this.statistics.count_300 > 0) counts.push(" " + this.statistics.count_300 + "x 300 ");
            if (this.statistics.count_100 > 0) counts.push(" " + this.statistics.count_100 + "x 100 ");
            if (this.statistics.count_miss > 0) counts.push(" " + this.statistics.count_miss + "x miss ");
        }
        else if (this.mode_int === 2) {// catch
            // 官方把drop翻译成水滴，把droplet翻译成小水滴，个人感觉怪怪的
            if (this.statistics.count_300 > 0) counts.push(" " + this.statistics.count_300 + "x 水果 ");
            if (this.statistics.count_100 > 0) counts.push(" " + this.statistics.count_100 + "x 中果 ");
            if (this.statistics.count_50 > 0) counts.push(" " + this.statistics.count_50 + "x 果粒 ");
            if (this.statistics.count_miss > 0) counts.push(" " + this.statistics.count_miss + "x miss水果 ");
            if (this.statistics.count_katu > 0) counts.push(" " + this.statistics.count_katu + "x miss果粒 ");
        }
        else if (this.mode_int === 3) {// mania
            if (this.statistics.count_geki > 0) counts.push(" " + this.statistics.count_geki + "x 彩300 ");
            if (this.statistics.count_300 > 0) counts.push(" " + this.statistics.count_300 + "x 300 ");
            if (this.statistics.count_katu > 0) counts.push(" " + this.statistics.count_katu + "x 200 ");
            if (this.statistics.count_100 > 0) counts.push(" " + this.statistics.count_100 + "x 100 ");
            if (this.statistics.count_50 > 0) counts.push(" " + this.statistics.count_50 + "x 50 ");
            if (this.statistics.count_miss > 0) counts.push(" " + this.statistics.count_miss + "x miss ");
        }
        return counts.join("|");
    }

    /**
     * 完整输出成绩信息
     * @param {string} [username] 通过Score Api获取时Score里没有提供user，所以将username传递过来
     * @returns {string}
     */
    toString(username) {
        let output = "";
        output += "谱面： " + this.getBeatmapTitle() + "\n";
        output += "模式： " + this.mode + "\n";
        output += "玩家： " + (this.user.username ?? username) + "\n";
        output += "Mods： " + (this.mods.length > 0) ? this.mods.join("") : "None" + "\n";
        output += "Rank： " + this.rank + "\n";
        output += "PP： " + this.pp.toFixed(2) + "\n";
        output += "Acc： " + (this.accuracy * 100).toFixed(3) + "%" + "\n";
        output += "Combo： " + utils.format_number(this.max_combo) + "\n";
        output += "得分： " + utils.format_number(this.score) + "\n";
        output += this.getStatisticsString() + "\n";

        output += "日期： " + utils.getCompareInterval(this.created_at) + "\n";
        return output;
    }

    /**
     * 输出一行谱面信息和一行成绩信息
     * @returns {string}
     */
    toSimpleString() {
        let output = "";
        output += this.getBeatmapTitle() + " :" + this.mode + " " + ((this.mods.length > 0) ? " +" + this.mods.join("") : "") + "\n";
        output += "成绩： " + this.pp.toFixed(2) + "pp | " + (this.accuracy * 100).toFixed(2) + "% | " + this.rank + " | " + utils.format_number(this.score) + " | x" + this.max_combo;
        return output;
    }

    /**
     * 仅输出一行成绩信息
     * @returns {string}
     */
    toMinString() {
        let output = "";
        output += this.pp.toFixed(2) + "pp \t| " + (this.accuracy * 100).toFixed(2) + "% \t| " + this.rank + " \t| " + ((this.mods.length > 0) ? this.mods.join("") : "None") + " \t| x" + this.max_combo;
        return output;
    }
}

class Recent {
    constructor(data, server, mode) {
        /** 成绩数据
         *  @type {Score} */
        this.score = new Score(data?.score);
        /** 玩家数据
         *  @type {User} */
        this.user = new User(data?.user);
        /** 指定server
         *  @type {string} */
        this.server = server;
        /** 指定mode
         *  @type {string} */
        this.mode = mode;
    }

    toString() {
        return this.score.toString(this.user.username);
    }
}

class Best {
    constructor(data, server, mode) {
        /** 成绩数据
         *  @type {Array<Score>} */
        this.scores = data?.scores.map((score) => new Score(score));
        /** 玩家数据
         *  @type {User} */
        this.user = new User(data?.user);
        /** 指定server
         *  @type {string} */
        this.server = server;
        /** 指定mode
         *  @type {string} */
        this.mode = mode;
    }

    /**
     * 每个成绩仅输出单行
     * @param {number} [scoreCount] 显示的成绩最多个数
     * @returns {string}
     */
    toMinString(scoreCount) {
        if (!this.scores || this.scores.length <= 0) throw "查不到 " + this.user.username + " 在 " + (this.mode ?? this.user.playmode) + " 上的任何成绩";
        let lines = this.scores.map((score, index) => "#" + (index + 1) + "\t " + score.toMinString());
        if (scoreCount && scoreCount > 0 && scoreCount <= this.scores.length) {
            return lines.slice(0, scoreCount).join("\n");
        }
        return lines.join("\n");
    }

    /**
     * 每个成绩输出谱面行和成绩行
     * @param {number} [scoreCount] 显示的成绩最多个数
     * @returns {string}
     */
    toSimpleString(scoreCount) {
        if (!this.scores || this.scores.length <= 0) throw "查不到 " + this.user.username + " 在 " + (this.mode ?? this.user.playmode) + " 上的任何成绩";
        let lines = this.scores.map((score, index) => "#" + (index + 1) + "\t " + score.toSimpleString());
        if (scoreCount && scoreCount > 0 && scoreCount <= this.scores.length) {
            return lines.slice(0, scoreCount).join("\n");
        }
        return lines.join("\n");
    }

    /**
     * 获取指定index的bp成绩
     * @param {number} index 索引，从1开始
     */
    getScore(index) {
        if (!this.scores || this.scores.length <= 0) throw "查不到 " + this.user.username + " 在 " + (this.mode ?? this.user.playmode) + " 上的任何成绩";
        if (!index || index <= 0) throw "无效序号";
        if (index > this.scores.length) throw "序号超过寻找到的bp个数";
        return this.scores[index - 1].toString();
    }

    getList(key) {
        return this.scores.map((score) => score[key]);
    }

    getList_Acc() {
        return this.scores.map((score) => score.accuracy * 100);
    }

    getList_Mods() {
        return this.scores.map((score) => {
            let mods = score.mods;
            // NC替换为DT
            let ncIndex = mods.indexOf("NC");
            if (ncIndex >= 0) {
                mods.splice(ncIndex, 1, "DT");
            }
            return mods;
        });
    }

    /**
     * 获取bp统计信息
     * @returns {string}
     */
    getStatistics() {
        if (!this.scores || this.scores.length <= 0) throw "查不到 " + this.user.username + " 在 " + (this.mode ?? this.user.playmode) + " 上的任何成绩";
        let user = this.scores[0].user.username;
        let mode = this.scores[0].mode;
        let output = user + " 在 " + mode + " 的bp统计：\n";
        output += "\nrank统计：\n";
        let rank_list = ["SSH", "SS", "SH", "S", "A", "B", "C", "D", "XH", "X"];
        let translateRank = ["银SS", "SS", "银S", "S", "A", "B", "C", "D", "银SS", "银S"];
        let rank_count = [0, 0, 0, 0, 0, 0, 0, 0];
        let length = this.scores.length;
        for (let i = 0; i < length; i++) {
            // 记录rank
            let rank = this.scores[i].rank;
            let rankIndex = rank_list.indexOf(rank);
            if (rankIndex === 8 || rankIndex === 9) rankIndex -= 8; // XH => SSH, X => SS
            if (rankIndex < 0) { // 应该没有除rank_list之外的rank吧，这个只是以防万一
                rank_list.push(rank);
                translateRank.push(rank);
                rank_count.push(1);
            }
            else {
                rank_count[rankIndex] = rank_count[rankIndex] + 1;
            }
        }
        for (let i = 0; i < rank_list.length; i++) {
            if (rank_count[i] > 0) output += rank_count[i] + " 个 " + translateRank[i] + "\n";
        }
        output += "\npp统计：\n";
        let pps = utils.getNumArrayStatistics(this.getList("pp"));
        output += "最高pp：" + pps.max.toFixed(2) + "\n";
        output += "最低pp：" + pps.min.toFixed(2) + "\n";
        output += "平均pp：" + pps.average.toFixed(2) + "\n";
        output += "pp极差：" + (pps.max - pps.min).toFixed(2) + "\n";
        output += "变异系数：" + pps.cv.toFixed(2) + "%\n";
        let ppGroups = pps.groups.lines.map((line, index) => {
            return line.toFixed(2) + "(" + pps.groups.counts[index] + ")";
        });
        output += ppGroups.join(" > ") + "\n";
        output += "\nacc统计：\n";
        let accs = utils.getNumArrayStatistics(this.getList_Acc(), [100, 99, 98, 97, 96, 95]);
        output += "最高acc：" + accs.max.toFixed(2) + "\n";
        output += "最低acc：" + accs.min.toFixed(2) + "\n";
        output += "平均acc：" + accs.average.toFixed(2) + "\n";
        output += "acc极差：" + (accs.max - accs.min).toFixed(2) + "\n";
        output += "变异系数：" + accs.cv.toFixed(2) + "%\n";
        let accGroups = accs.groups.lines.map((line, index) => {
            return line + "%(" + accs.groups.counts[index] + ")";
        });
        output += accGroups.join(" > ") + "\n";
        output += "\n单mod统计：\n";
        let modsStatistics = utils.getModsArrayStatistics(this.getList_Mods(), this.getList("pp"));
        let mods_count = Object.keys(modsStatistics.mods_count).map((mod) => {
            return {
                mod,
                count: modsStatistics.mods_count[mod].count,
                maxpp: modsStatistics.mods_count[mod].maxpp
            }
        });
        let mods_count_string = mods_count.sort((a, b) => b.count - a.count).map((mc) => {
            return mc.mod + "(" + mc.count + ",maxpp=" + mc.maxpp.toFixed(0) + ")";
        });
        output += mods_count_string.join(" > ") + "\n";
        output += "\nmod组合统计：\n";
        let totalMods_count = Object.keys(modsStatistics.totalMods_count).map((mod) => {
            return {
                mod,
                count: modsStatistics.totalMods_count[mod].count,
                maxpp: modsStatistics.totalMods_count[mod].maxpp
            }
        });
        let totalMods_count_string = totalMods_count.sort((a, b) => b.count - a.count).map((mc) => {
            return mc.mod + "(" + mc.count + ",maxpp=" + mc.maxpp.toFixed(0) + ")";
        });
        output += totalMods_count_string.join(" > ") + "\n";
        return output;
    }
}

class User {
    constructor(data, server, mode) {
        /** 头像url
         *  @type {string} */
        this.avatar_url = data?.avatar_url;
        /** 国家/地区英文缩写
         *  @type {string} */
        this.country_code = data?.country_code;
        /** uid
         *  @type {number} */
        this.id = data?.id;
        /** 注册时间
         *  @type {Date} */
        this.join_date = new Date(data?.join_date);
        /** 默认模式
         *  @type {string} */
        this.playmode = data?.playmode;
        /** 曾用名
         *  @type {Array<string>} */
        this.previous_usernames = data?.previous_usernames;
        /** 玩家名
         *  @type {string} */
        this.username = data?.username;
        /** mode数据
         *  @type {Statistics} */
        this.statistics = new Statistics(data?.statistics);
        /** 指定server
         *  @type {string} */
        this.server = server;
        /** 指定mode
         *  @type {string} */
        this.mode = mode;
    }

    toString() {
        let output = this.username + " 在 " + (this.mode ?? this.playmode) + " 的信息：\n";
        output += this.statistics.toString();
        return output;
    }
}

module.exports.Statistics = Statistics;
module.exports.Beatmap = Beatmap;
module.exports.BeatmapSet = BeatmapSet;
module.exports.Score = Score;
module.exports.Recent = Recent;
module.exports.Best = Best;
module.exports.User = User;
