<script setup lang="ts">
  import { ref } from "vue";

  const words = ref(["a", "aba", "ababa", "aa"]); //prefix, suffix output 4
  const sentences = ref(["alice and bob love leetcode", "i think so too", "this is great thanks very much"]) //output 6
  const resultTestLimit = ref<any>();
  //count Prefix & Suffix
  function countPrefixAndSuffixPairs(words:any) {
    let count = 0;
    // ตรวจสอบทุกคู่คำในอาร์เรย์ words
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
            // i ต้องไม่เท่ากับ j
            if (i < j && isPrefixAndSuffix(words[i], words[j])) {
                count++;
            }
        }
    }
    return count;
  }
  function isPrefixAndSuffix(str1:string, str2:string) {
    // ตรวจสอบว่า str1 เป็นทั้ง prefix และ suffix ของ str2
    return str2.startsWith(str1) && str2.endsWith(str1);
  }

  //count words in sentence separate with space
  const mostWordsFound = function(sentences: any) {
    let countText = 0;
    for(let i=0; i<sentences.length; i++) {
        const length = splitSentences(sentences[i])
        if(length > countText) {
            countText = length;
        }
    }
    return countText;
};
  const splitSentences = function(sentence: string) {
      let content = sentence.split(" ");
      return content.length;
  }

  function fizzBuzz(n:number) {
    for(let i=1; i<=n; i++) {
        if(i%3 === 0 && i%5 === 0) {
            console.log('FizzBuzz');
        } else if(i%3 === 0) {
            console.log('Fizz');
        } else if(i%5 === 0) {
            console.log('Buzz');
        } else {
            console.log(i);
        }
    }

}
function countReplacedServers() {
  const serverStatus:any = {}; // To track success and error counts for each server
  let countSuccess = 0;
  let countError = 0;
  const n1 = 5;
  const logs1 = [
    's1 error',
    's2 error',
    's1 error',
    's4 success',
    's5 error',
    's3 success', 
    's1 error',
  ] //output 1
  const n2 = 3;
  const logs2 = [
    's2 error',
    's3 error',
    's2 error',
    's2 error',
    's3 error', 
    's3 error'
  ] //output 2
  // Process each log entry
  for (const log of logs1) {
    const [server, status] = log.split(" ");

    // Initialize the server's status if not already present
    if (!serverStatus[server]) {
      serverStatus[server] = { success: 0, error: 0 };
    }

    // Increment success or error counts
    if (status === "success") {
      serverStatus[server].success++;
      countSuccess++
    } else if (status === "error") {
      serverStatus[server].error++;
      countError++
    }
  }
  //sort array
  const sortedArray = Object.keys(serverStatus)
  .map(key => ({ key, ...serverStatus[key] })) // รวม key เข้าไปกับ value
  .sort((a, b) => b.error - a.error); // จัดเรียงโดย error จากมากไปน้อย

  //replace success
  const successList = sortedArray.filter((item:any) => item.success)
  for(let i=0; i<successList.length; i++) {
    sortedArray[i].success = 1;
    sortedArray[i].error = 0;
  }

  //get count error
  return sortedArray.filter((item:any) => item.error && !item.success).length;
}
//with 5 seconds, allow 2 successfully
function rateLimiter() {
  const requests = [
  { time: 0, domain: "www.xyz.com" },//1 true
  { time: 1, domain: "www.abc.com" },//1 true
  { time: 2, domain: "www.xyz.com" },//2 true
  { time: 3, domain: "www.pqr.com" },//1 true
  { time: 4, domain: "www.abc.com" },//2 true
  { time: 5, domain: "www.xyz.com" },//3 false
  //check valid 30 second
  { time: 6, domain: "www.xyz.com" },//4 true
  { time: 7, domain: "www.abc.com" },//3 true 
  { time: 8, domain: "www.xyz.com" },//5 false
];
  const result = [];
  const domainLogs:any = {};

  for (let i = 0; i < requests.length; i++) {
    const { time, domain } = requests[i];

    // Initialize the domain log if not already present
    if (!domainLogs[domain]) {
      domainLogs[domain] = [];
    }

    domainLogs[domain].push(time);
    //success 2 if time <=5
    const request5Sec = domainLogs[domain].filter((time:any) => time <= 5)
    const request30Sec = domainLogs[domain];

    // check count request
    if (request5Sec.length > 2 || request30Sec.length > 5) {
      result.push('{ time, domain, status: 429, message: "Too many requests" }');
    } else {
      result.push('{ time, domain, status: 200, message: "OK" }');
    }
  }
  return result;
}

// Example usage
resultTestLimit.value = rateLimiter();
  
</script>

<template>
  <div>
    <div>count prefix and suffix :{{ countPrefixAndSuffixPairs(words) }}</div>
    <div>count words in sentence separate with space :{{ mostWordsFound(sentences) }}</div>
    <div v-for="(item , index) of resultTestLimit">{{ item }} <br></div>
    <div>replace success to server and get error: {{ countReplacedServers() }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
