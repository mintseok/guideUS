import requests
import json
import itertools
import re

 #이 경우에는 총 6가지가 담겨있어야 함
 #도착시간 리스트로 담음
ArriveTimeList=[]   
totalList=[]
IndexSequence=[]
xySequence=[]

######바꿔줘야하는애들#############
#지역이름, 좌표, 좌표, 보낼시간(분)*60초
'''
tempInfo=[['오목공원', 126.87342746092098, 37.52795101285814,0 ],
           ['한강시민공원', 126.91721575454739, 37.534300329910174,40*60],
           ['타임스퀘어', 126.90348334722331, 37.51706045642019,50*60],
           ['영등포시장역', 126.90516922535829, 37.52274323452394,30*60],
           ['양정고', 126.88665216380912, 37.53517528749371,20*60],
           ['여의도IFC', 126.9258950594651, 37.524722548427626,0]
           ]
'''
tempInfo=[['압구정로데오거리', 127.039152029523, 37.5267558230172, 0], 
        ['하나은행 용산역지점', 126.96443556360899,37.5286310416737, 600], 
        ['야탑역 수인분당선', 127.128742990837, 37.4113736407028, 600],
        ['대치역 3호선', 127.06320340952898, 37.4944966528582, 600], 
        ['세븐일레븐 오리역점', 127.10927772753149, 37.33932567183978, 600], 
        ['강남역사거리', 127.027638348418, 37.4979521720737, 0]
        ]
'''
tempInfo=[['오목교', 126.87549134655843,37.52713456874572,0 ],
           ['파리공원',126.87789791688866,37.53477114356204,40*60],
           ['진명',126.86588315585934, 37.52431785292739,50*60],
           ['양정',126.88665216380912, 37.53517528749371,30*60],
           ['홍익병원',126.86357565275733,37.52881078289328,0],
           ]
'''
#name, longi, leti, waitTime(초)3
numOfGap=5#노드간 사이 개수(전체 노드 개수 -1)
numOfWayPoints=6-2  #경유지 개수

#################################
numberOfPermutaion=1    
for i in range (1,numOfWayPoints+1):
    numberOfPermutaion*=i   #경유지 개수로 만든 순열의 개수 factorial

pool = []
for i in range(numOfWayPoints):
    pool.append(str(i+1))       #['1','2','3'] --> 이거로 순열 만들 것임

permuList=list(map(''.join, itertools.permutations(pool))) # numOfWayPoints만큼의 경유지 수로 수열 만들기

def ShowOptimalRoot(ArriveTimeList,tempInfo, permuList):
    shortest=976543210000
    shortestIndex = 100
    for i in range(len(ArriveTimeList)):
        if ArriveTimeList[i]<shortest:
            shortest=ArriveTimeList[i]
            shortestIndex=i
    #print()
    #print('경유지별 대기시간 + 실시간 도로 상황을 고려한 최적의 경로: ',end='')
    #print('{} -> '.format(tempInfo[0][0]),end='')
    IndexSequence.append(0)
    
    xySequence.append(tempInfo[0][2])
    xySequence.append(tempInfo[0][1])
    for i in range(len(permuList[shortestIndex])):
        #print('{} -> '.format(tempInfo[int(permuList[shortestIndex][i])][0]),end='')
        IndexSequence.append(int(permuList[shortestIndex][i]))
        xySequence.append(tempInfo[int(permuList[shortestIndex][i])][2])
        xySequence.append(tempInfo[int(permuList[shortestIndex][i])][1])
        
    #print('{}'.format(tempInfo[len(tempInfo)-1][0]))
    IndexSequence.append(len(tempInfo)-1)
    
    xySequence.append(tempInfo[len(tempInfo)-1][2])
    xySequence.append(tempInfo[len(tempInfo)-1][1])
    
#nowTime, Dename, Delongi, Deleti, Arname, Arlongi, Arleti, ArwaitTime
#origin이랑 destination도 바꿔줘야하나
def calNextDepartureTime(nowTime, Dename, Delongi, Deleti, Arname, Arlongi, Arleti, ArwaitTime):
   
    REST_API_KEY = "e1b38c8743ebf6b94b9fb2fb06bda8ff" # trial: e1b38c8743ebf6b94b9fb2fb06bda8ff original: 31f79d70f280d203655c06f29b46f395
    url = "https://apis-navi.kakaomobility.com/v1/future/directions"
    header = {"Authorization": 'KakaoAK ' + REST_API_KEY}
    payload = {'departure_time':'202111141005',
                'origin':'126.87549134655843,37.52713456874572,name=오목교',
                'destination':'126.87789791688866,37.53477114356204,name=파리공원',
                'priority':'TIME',
                'car_fuel':'GASOLINE',
                'car_hipass':'false',
                'alternatives':'false',
                'road_details':'false',
                'summary':'false'
            }
    payload['departure_time']=str(nowTime)
    payload['origin']='{},{},name={}'.format(Delongi,Deleti,Dename)
    payload['destination']='{},{},name={}'.format(Arlongi,Arleti,Arname)
    
    response =requests.get(url, params=payload, headers=header)
    print(nowTime, Dename, Delongi, Deleti, Arname, Arlongi, Arleti, ArwaitTime)
    lisT = str(response.json()["routes"])
    print(lisT)
    lisT2=str(response.json())
    totalList.append(lisT2)
    s = 'duration'
    count=0
    temp=0
    b=lisT.find(s)
    count+=1
    for i in lisT[b+11:]:
            if(i=='}'):
                break
            temp+=1
    print(lisT[b+11:b+11+temp])
    print("HI")
    #출발지에서 도착지까지의 거리 + 도착지에서 보내는 시간을 return 함
    #print('{}~{}까지 걸리는 시간 : {}분'.format(Dename, Arname,int(lisT[b+11:b+11+temp])//60))
    return int(float(int(lisT[b+11:b+11+temp]) + ArwaitTime))


for i in range(numberOfPermutaion): #0~5 만들수있는 순열의 개수 6
    departure_time = 202111151100 #init
    nextDepartureTime=departure_time
    FinalDepartureTime=0
    #print()
    #print('Case{} 출발시간 : {}'.format(i+1,departure_time))
    for j in range(numOfWayPoints): #경유지 개수 3 0/1/2
        
        earlierPosition=0
        nowPosition = int(permuList[i][j])
        
        if j==0:
            #nowTime, Dename, Delongi, Deleti, Arname, Arlongi, Arleti, ArwaitTime
            b = calNextDepartureTime(nextDepartureTime, #출발시간
                                                     tempInfo[0][0],  #출발지명
                                                     tempInfo[0][1],  #출발지 longi
                                                     tempInfo[0][2],  #출발지 leti
                                                     tempInfo[nowPosition][0],    #도착지명
                                                     tempInfo[nowPosition][1],    #도착 longi
                                                     tempInfo[nowPosition][2],    #도착 leti
                                                     tempInfo[nowPosition][3],    #도착지에서 보내는 시간
                                                     );
            minn= b//60

            if nextDepartureTime%100 + minn>59:
                nextDepartureTime+=100
                c = nextDepartureTime%100+minn-60
                if c<10:
                    c='0'+str(c)
                nextDepartureTime= int(str(nextDepartureTime//100) + str(c))
            else:
                nextDepartureTime=nextDepartureTime+minn
            #print('{}~{}가고 나서 다음 출발시간 : {}'.format(tempInfo[0][0],tempInfo[nowPosition][0],nextDepartureTime))
            continue
        
        if j!=0:
            earlierPosition=int(permuList[i][j-1])
        
        #print(nowPosition, earlierPosition)
        
        #nowTime, Dename, Delongi, Deleti, Arname, Arlongi, Arleti, ArwaitTime
        b= calNextDepartureTime(nextDepartureTime, #출발시간
                                                 tempInfo[earlierPosition][0],  #출발지명
                                                 tempInfo[earlierPosition][1],  #출발지 longi
                                                 tempInfo[earlierPosition][2],  #출발지 leti
                                                 tempInfo[nowPosition][0],    #도착지명
                                                 tempInfo[nowPosition][1],    #도착 longi
                                                 tempInfo[nowPosition][2],    #도착 leti
                                                 tempInfo[nowPosition][3],    #도착지에서 보내는 시간
                                                 );
        minn= b//60

        if nextDepartureTime%100 + minn>59:
            nextDepartureTime+=100
            c = nextDepartureTime%100+minn-60
            if c<10:
                c='0'+str(c)
            nextDepartureTime= int(str(nextDepartureTime//100) + str(c))
        else:
            nextDepartureTime=nextDepartureTime+minn
        #print('{}~{}가고 나서 다음 출발시간 : {}'.format(tempInfo[earlierPosition][0],tempInfo[nowPosition][0],nextDepartureTime))
    #nowTime, Dename, Delongi, Deleti, Arname, Arlongi, Arleti, ArwaitTime
    earlierPosition=nowPosition
    nowPosition=len(tempInfo)-1
    b = calNextDepartureTime(nextDepartureTime, #출발시간
                                                 tempInfo[earlierPosition][0],  #출발지명
                                                 tempInfo[earlierPosition][1],  #출발지 longi
                                                 tempInfo[earlierPosition][2],  #출발지 leti
                                                 tempInfo[nowPosition][0],    #도착지명
                                                 tempInfo[nowPosition][1],    #도착 longi
                                                 tempInfo[nowPosition][2],    #도착 leti
                                                 tempInfo[nowPosition][3],    #도착지에서 보내는 시간
                                                 );
    minn= b//60

    if nextDepartureTime%100 + minn>59:
        nextDepartureTime+=100
        c = nextDepartureTime%100+minn-60
        if c<10:
            c='0'+str(c)
        nextDepartureTime= int(str(nextDepartureTime//100) + str(c))
    else:
        nextDepartureTime=nextDepartureTime+minn
        
    FinalDepartureTime = nextDepartureTime
    #print('{}~{}가고 나서 다음 출발시간 : {}'.format(tempInfo[earlierPosition][0],tempInfo[nowPosition][0],FinalDepartureTime))
    
    ArriveTimeList.append(FinalDepartureTime)

ShowOptimalRoot(ArriveTimeList, tempInfo, permuList)
#print(ArriveTimeList)
indexOfMin=ArriveTimeList.index(min(ArriveTimeList))
#print(indexOfMin)
#print(len(totalList))

candList=[]
for j in range(0,len(totalList),numOfGap):
    temp=''
    for k in range(numOfGap):
        temp+=str(totalList[k+j])
    candList.append(temp)
    
slisT = str(candList[indexOfMin])
#print(slisT)
s='vertexes'
count=0
vertex=[]
for i in re.finditer(s, slisT):
    count+=1
    #print(i.start(), i.end())
    index=i.start()+11
    while(True):
        index+=1
        stop=']'
        partion=','
        partionCount=0
        temp=[]
        start_var=index
        while (True):
            
            if slisT[index]==partion and partionCount==0:
                var = slisT[start_var:index]
                vertex.append(float(var))
                start_var=index+1
                partionCount+=1
                count+=1
                #print(float(var),end='')
                
            elif slisT[index]==partion and partionCount==1:
                var=slisT[start_var:index]
                vertex.append(float(var))
                #print(var)
                count+=1
                break
                
            elif slisT[index]==stop and partionCount==1:
                var=slisT[start_var:index]
                vertex.append(float(var))
                #print(float(var))
                count+=1
                break
            
            index+=1
            
            
        if slisT[index]==stop:
            break
        

#print(count)
print(vertex)
    
f = open("./public/data/routes.txt",'w')
f.write(str(vertex))
print()
#print(IndexSequence)
print(xySequence)