
# coding: utf-8

# In[103]:


import pandas as pd


# In[104]:


dfData = pd.read_csv('../dataset/project_distribution.csv')


# In[113]:


def process(grp):
    a = []
    for name_of_the_group, group in grp:
        a.append(group)
    dfZero = pd.DataFrame(a[0])
    for i in range(1,len(a)):
        #print(i)
        dfZero = dfZero.append(pd.DataFrame(a[i]))
    return dfZero    


# In[114]:


def availablejob():
    dfData = pd.read_csv('../dataset/project_distribution.csv')
    dfData = dfData[['projectid','jobid','project','skills','status','jobdescription']]
    grp = dfData.groupby(['projectid','jobid'])
    res = process(grp)
    return res


# In[115]:


#availablejob()


# In[84]:


#a = []
#for name_of_the_group, group in grp:
#    a.append(group)


# In[90]:


#df = pd.DataFrame(a[0])


# In[99]:


#for i in range(1,len(a)):
#    #print(i)
#    df = df.append(pd.DataFrame(a[i]))


# In[97]:


#range(1,len(a))


# In[100]:


#df


# In[ ]:




